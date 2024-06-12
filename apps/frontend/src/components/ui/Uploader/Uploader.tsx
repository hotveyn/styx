import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";
import { UploadFile, UploadProps } from "antd/es/upload";
import { Dispatch, FC, SetStateAction, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { allowFileTypes } from "../../../constants/common";

interface Props {
  fileList: UploadFile[];
  setFileList: Dispatch<SetStateAction<UploadFile[]>>;
  maxFileToUpload?: number;
}

const Uploader: FC<Props> = ({
  fileList,
  setFileList,
  maxFileToUpload = 1,
}) => {
  const { t } = useTranslation();
  const validateFileType = ({ type }: UploadFile, allowedTypes?: string) => {
    if (!allowedTypes) {
      return true;
    }

    if (type) {
      return allowedTypes.includes(type);
    }
  };

  const uploadProps: UploadProps = useMemo(
    () => ({
      fileList: fileList,
      maxCount: maxFileToUpload,
      beforeUpload: (file) => {
        const allowedTypes = allowFileTypes.zip;
        const isAllowedType = validateFileType(file, allowedTypes);

        const maxMb = 10;

        const isLtMaxmb = file.size / 1024 / 1024 <= maxMb;
        if (!isLtMaxmb) {
          setFileList((state) => [...state]);
          message.error(`${t("upload.maxSize")} ${maxMb}${t("upload.mb")}`);
          return false;
        }

        if (!isAllowedType) {
          setFileList((state) => [...state]);
          message.error(
            `${t("upload.fileError")} ${file.name}. ${t("upload.allowedTypes")}: .tar, .gz`
          );
          return false;
        }

        setFileList((state) => [...state, file]);

        return false;
      },
      onRemove: (file) => {
        setFileList((prev) => prev.filter(({ uid }) => uid !== file.uid));
      },
    }),
    [fileList]
  );

  return (
    <div style={{ marginBottom: 20 }}>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />} disabled={Boolean(fileList.length)}>
          {t("upload.label")} (.tar, .gz)
        </Button>
      </Upload>
    </div>
  );
};

export default Uploader;
