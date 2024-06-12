import { Button, Form, notification } from "antd";
import { AxiosError } from "axios";
import { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { Content } from "vanilla-jsoneditor";
import {
  CreateUserDto,
  UserControllerCreateError,
  UserEntity,
} from "../../../api/data-contracts";
import queryKeys from "../../../constants/queryKeys";
import api from "../../../pages/Users/api";
import userProfileStore from "../../../store/UserProfileStore";
import { DrawerState, IDrawerHandler } from "../../../types/common";
import { deleteEmptyKeys } from "../../../utils/deleteEmptyKeys";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage";
import { renderFormItems } from "../../../utils/renderFormItems";
import { getJSONContent } from "../../ui/JSONEditor/getJSONContent";
import { getFormItems } from "./formItems.data";

interface Props {
  drawerState: DrawerState;
  refetch: () => void;
  handleDrawerOpen: IDrawerHandler<UserEntity>;
  user: UserEntity | null;
}

const UserForm: FC<Props> = ({
  drawerState,
  refetch,
  handleDrawerOpen,
  user,
}) => {
  const { t } = useTranslation();

  const mutationKey =
    drawerState === "add" ? queryKeys.addUser : queryKeys.editUser;

  const mutationFn =
    drawerState === "add"
      ? (formData: CreateUserDto) => {
          const payload = {
            ...formData,
            additionalData: (JSONvalue as { text: string }).text || "{}",
            organizationId:
              userProfileStore.getRawState().organizationId ||
              formData.organizationId,
          };

          deleteEmptyKeys(payload, ["organizationId"]);

          return api.addUser(payload);
        }
      : (formData: CreateUserDto) => {
          if (user?.login === userProfileStore.getRawState().login) {
            const additionalData =
              (formData.additionalData as unknown as { text: string })?.text ??
              formData.additionalData;

            userProfileStore.update((s) => ({
              ...s,
              name: formData.name,
              additionalData,
            }));
          }

          deleteEmptyKeys(formData, ["password"]);

          return api.editUser(
            {
              ...formData,
              additionalData: (JSONvalue as { text: string }).text || "{}",
            },
            +user!.id
          );
        };

  const successMessage =
    drawerState === "add"
      ? t("users.queries.post.success")
      : t("users.queries.patch.success");
  const errorMessage =
    drawerState === "add"
      ? t("users.queries.post.error")
      : t("users.queries.patch.error");

  const { mutate, isLoading } = useMutation({
    mutationKey: [mutationKey],
    mutationFn,
    onSuccess: () => {
      refetch();
      notification.success({
        message: successMessage,
      });
      handleDrawerOpen(false, "", null);
    },
    onError: (error: AxiosError<UserControllerCreateError>) => {
      const translatedError = getApiErrorMessage(t, error.response?.data.thing);

      notification.error({
        message: translatedError || errorMessage,
      });
    },
  });

  const handleSubmit = (formData: CreateUserDto) => {
    mutate(formData);
  };

  const okButtonText =
    drawerState === "add" ? t("buttons.add") : t("buttons.edit");

  const [JSONvalue, setJSONvalue] = useState<Content>({
    ...getJSONContent<UserEntity>(user!),
  });

  const handler = useCallback(
    (content: Content) => {
      setJSONvalue(content);
    },
    [JSONvalue]
  );

  return (
    <Form<CreateUserDto> onFinish={handleSubmit}>
      {renderFormItems(
        getFormItems(user, drawerState, JSONvalue, handler, t),
        t
      )}
      <Button type="primary" htmlType="submit" loading={isLoading}>
        {okButtonText}
      </Button>
    </Form>
  );
};

export default UserForm;
