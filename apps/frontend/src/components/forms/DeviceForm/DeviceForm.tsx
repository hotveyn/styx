import { Button, Form, notification } from "antd";
import { AxiosError } from "axios";
import { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { Content } from "vanilla-jsoneditor";
import {
  CreateDeviceDto,
  DeviceControllerCreateError,
  DeviceEntity,
  UpdateDeviceDto,
} from "../../../api/data-contracts";
import queryKeys from "../../../constants/queryKeys";
import api from "../../../pages/Devices/api";
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
  handleDrawerOpen: IDrawerHandler<DeviceEntity>;
  device: DeviceEntity | null;
}

const DeviceForm: FC<Props> = ({
  drawerState,
  refetch,
  handleDrawerOpen,
  device,
}) => {
  const { t } = useTranslation();

  const mutationFn =
    drawerState === "add"
      ? (formData: CreateDeviceDto) => {
          const payload = {
            ...formData,
            address: JSON.parse(formData.address).address,
            geo: `${JSON.parse(formData.address).geo_lat} ${JSON.parse(formData.address).geo_lon}`,
            additionalData: (JSONvalue as { text: string }).text || "{}",
            organizationId:
              userProfileStore.getRawState().organizationId ||
              formData.organizationId,
          };

          deleteEmptyKeys(payload, ["organizationId", "code"]);
          return api.addDevice(payload);
        }
      : (formData: UpdateDeviceDto) => {
          const payload = {
            ...formData,
            address: JSON.parse(formData.address!).address,
            geo: `${JSON.parse(formData.address!).geo_lat} ${JSON.parse(formData.address!).geo_lon}`,
            additionalData: (JSONvalue as { text: string }).text || "{}",
            organizationId:
              userProfileStore.getRawState().organizationId || undefined,
          };
          deleteEmptyKeys(payload, ["organizationId", "code"]);

          return api.editDevice(payload, +device!.id);
        };

  const mutationKey =
    drawerState === "add" ? queryKeys.addDevice : queryKeys.editDevice;

  const successMessage =
    drawerState === "add"
      ? t("devices.queries.post.success")
      : t("devices.queries.patch.success");
  const errorMessage =
    drawerState === "add"
      ? t("devices.queries.post.error")
      : t("devices.queries.patch.error");

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
    onError: (error: AxiosError<DeviceControllerCreateError>) => {
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

  const handleSubmit = (formData: CreateDeviceDto) => {
    mutate(formData);
  };

  const okButtonText =
    drawerState === "add" ? t("buttons.add") : t("buttons.edit");

  const [JSONvalue, setJSONvalue] = useState<Content>({
    ...getJSONContent<DeviceEntity>(device!),
  });

  const handler = useCallback(
    (content: Content) => {
      setJSONvalue(content);
    },
    [JSONvalue]
  );

  return (
    <Form<CreateDeviceDto> onFinish={handleSubmit}>
      {renderFormItems(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        getFormItems(device, drawerState, JSONvalue, handler, t),
        t
      )}
      <Button type="primary" htmlType="submit" loading={isLoading}>
        {okButtonText}
      </Button>
    </Form>
  );
};

export default DeviceForm;
