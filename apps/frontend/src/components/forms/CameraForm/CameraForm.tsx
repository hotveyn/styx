import { Button, Form, notification } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import {
  CameraEntity,
  CreateCameraDto,
  UpdateCameraDto,
} from "../../../api/data-contracts";
import queryKeys from "../../../constants/queryKeys";
import api from "../../../pages/Cameras/api";
import { DrawerState, IDrawerHandler } from "../../../types/common";
import { renderFormItems } from "../../../utils/renderFormItems";
import { getFormItems } from "./formItems.data";

interface Props {
  drawerState: DrawerState;
  refetch: () => void;
  handleDrawerOpen: IDrawerHandler<CameraEntity>;
  camera: CameraEntity | null;
}

const CameraForm: FC<Props> = ({
  drawerState,
  refetch,
  handleDrawerOpen,
  camera,
}) => {
  const { t } = useTranslation();

  const mutationFn =
    drawerState === "add"
      ? (formData: CreateCameraDto) => api.addCamera(formData)
      : (formData: UpdateCameraDto) => {
          return api.editCamera(formData, +camera!.id);
        };

  const mutationKey =
    drawerState === "add" ? queryKeys.addCamera : queryKeys.editCamera;

  const successMessage =
    drawerState === "add"
      ? t("cameras.queries.post.success")
      : t("cameras.queries.patch.success");

  const errorMessage =
    drawerState === "add"
      ? t("cameras.queries.post.error")
      : t("cameras.queries.patch.error");

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
    onError: () => {
      notification.error({
        message: errorMessage,
      });
    },
  });

  const handleSubmit = (formData: CreateCameraDto) => {
    mutate(formData);
  };

  const okButtonText =
    drawerState === "add" ? t("buttons.add") : t("buttons.edit");

  return (
    <Form<CreateCameraDto> onFinish={handleSubmit}>
      {renderFormItems(getFormItems(camera, t), t)}
      <Button type="primary" htmlType="submit" loading={isLoading}>
        {okButtonText}
      </Button>
    </Form>
  );
};

export default CameraForm;
