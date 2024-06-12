import { Button, Form, UploadFile, notification } from "antd";
import { AxiosError } from "axios";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import {
  ApplicationControllerCreateError,
  ApplicationEntity,
  CreateApplicationDto,
  CreateOrganizationDto,
  UpdateApplicationDto,
} from "../../../api/data-contracts";
import queryKeys from "../../../constants/queryKeys";
import api from "../../../pages/Applications/api";
import { DrawerState, IDrawerHandler } from "../../../types/common";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage";
import { renderFormItems } from "../../../utils/renderFormItems";
import Uploader from "../../ui/Uploader/Uploader";
import { getFormItems } from "./formItems.data";

interface Props {
  drawerState: DrawerState;
  refetch: () => void;
  handleDrawerOpen: IDrawerHandler<ApplicationEntity>;
  application: ApplicationEntity | null;
}

const ApplicationForm: FC<Props> = ({
  drawerState,
  refetch,
  handleDrawerOpen,
  application,
}) => {
  const { t } = useTranslation();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileError, setFileError] = useState("");

  const [form] = Form.useForm();

  const mutationFn =
    drawerState === "add"
      ? (formData: CreateApplicationDto) => {
          return api.addApplication(formData);
        }
      : (formData: UpdateApplicationDto) => {
          return api.editApplication(application!.name, formData);
        };

  const mutationKey =
    drawerState === "add"
      ? queryKeys.addApplication
      : queryKeys.editOrganization;

  const successMessage =
    drawerState === "add"
      ? t("applications.queries.post.success")
      : t("applications.queries.patch.success");
  const errorMessage =
    drawerState === "add"
      ? t("applications.queries.post.error")
      : t("applications.queries.patch.error");

  const { mutate: createAppMutate, isLoading } = useMutation({
    mutationKey: [mutationKey],
    mutationFn,
    onSuccess: (data) => {
      if (fileList.length) {
        api.uploadApplication(data.name, {
          app: fileList[0] as unknown as File,
        });
      }
      refetch();
      notification.success({
        message: successMessage,
      });
      handleDrawerOpen(false, "", null);
    },
    onError: (error: AxiosError<ApplicationControllerCreateError>) => {
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

  const handleSubmit = (formData: CreateApplicationDto) => {
    if (fileList.length === 0 && drawerState === "add") {
      setFileError(t("upload.required"));
      return;
    }
    setFileError("");
    createAppMutate(formData);
  };

  const okButtonText =
    drawerState === "add" ? t("buttons.add") : t("buttons.edit");

  return (
    <Form<CreateOrganizationDto> onFinish={handleSubmit} form={form}>
      {renderFormItems(getFormItems(application, t), t)}
      {drawerState === "add" && (
        <>
          <Uploader fileList={fileList} setFileList={setFileList} />
          <div style={{ color: "red", marginBottom: "20px" }}>{fileError}</div>
        </>
      )}
      <Button type="primary" htmlType="submit" loading={isLoading}>
        {okButtonText}
      </Button>
    </Form>
  );
};

export default ApplicationForm;
