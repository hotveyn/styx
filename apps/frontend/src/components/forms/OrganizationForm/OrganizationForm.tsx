import { Button, Form, notification } from "antd";
import { AxiosError } from "axios";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import {
  CreateOrganizationDto,
  OrganizationControllerCreateError,
  OrganizationEntity,
  UpdateOrganizationDto,
} from "../../../api/data-contracts";
import queryKeys from "../../../constants/queryKeys";
import api from "../../../pages/Organizations/api";
import { DrawerState, IDrawerHandler } from "../../../types/common";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage";
import { renderFormItems } from "../../../utils/renderFormItems";
import { getFormItems } from "./formItems.data";

interface Props {
  drawerState: DrawerState;
  refetch: () => void;
  handleDrawerOpen: IDrawerHandler<OrganizationEntity>;
  organization: OrganizationEntity | null;
}

const OrganizationForm: FC<Props> = ({
  drawerState,
  refetch,
  handleDrawerOpen,
  organization,
}) => {
  const { t } = useTranslation();

  const mutationFn =
    drawerState === "add"
      ? (formData: CreateOrganizationDto) => api.addOrganization(formData)
      : (formData: UpdateOrganizationDto) => {
          return api.editOrganization(formData, +organization!.id);
        };

  const mutationKey =
    drawerState === "add"
      ? queryKeys.addOrganization
      : queryKeys.editOrganization;

  const successMessage =
    drawerState === "add"
      ? t("organizations.queries.post.success")
      : t("organizations.queries.patch.success");
  const errorMessage =
    drawerState === "add"
      ? t("organizations.queries.post.error")
      : t("organizations.queries.patch.error");

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
    onError: (error: AxiosError<OrganizationControllerCreateError>) => {
      if (error.response?.data.thing) {
        const translatedError = getApiErrorMessage(
          t,
          error.response.data.thing
        );
        notification.error({
          message: translatedError || errorMessage,
        });
      }
    },
  });

  const handleSubmit = (formData: CreateOrganizationDto) => {
    mutate(formData);
  };

  const okButtonText =
    drawerState === "add" ? t("buttons.add") : t("buttons.edit");

  return (
    <Form<CreateOrganizationDto> onFinish={handleSubmit}>
      {renderFormItems(getFormItems(organization, t), t)}
      <Button type="primary" htmlType="submit" loading={isLoading}>
        {okButtonText}
      </Button>
    </Form>
  );
};

export default OrganizationForm;
