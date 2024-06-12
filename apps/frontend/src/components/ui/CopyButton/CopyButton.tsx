import { CopyOutlined } from "@ant-design/icons";
import { Button, Tooltip, notification } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  copyText: string;
  entityKey: "device" | "goal";
  entityName: string;
}

const CopyButton: FC<Props> = ({ copyText, entityKey, entityName }) => {
  const { t } = useTranslation();

  const successMessage = `${t("copy.notify.key")} ${t(`copy.notify.${entityKey}`)} ${entityName} ${t("copy.notify.success")}`;

  const handleCopy = () => {
    const textArea = document.createElement("textarea");
    textArea.value = copyText;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      notification.success({
        message: successMessage,
      });
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <Tooltip title={t("copy.tooltip")}>
      <Button onClick={handleCopy} size="small">
        <CopyOutlined />
      </Button>
    </Tooltip>
  );
};

export default CopyButton;
