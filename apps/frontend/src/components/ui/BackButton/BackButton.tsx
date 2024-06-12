import { CaretLeftOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

interface Props {
  link: string;
}

const BackButton: FC<Props> = ({ link }) => {
  const { t } = useTranslation();

  const location = useLocation();

  const state = useMemo(() => location.state, []);

  return (
    <Tooltip title={t("buttons.back")}>
      <Link to={state?.previousPath ? `${state?.previousPath}` : link}>
        <Button
          icon={<CaretLeftOutlined />}
          style={{ marginBottom: "10px" }}
        ></Button>
      </Link>
    </Tooltip>
  );
};

export default BackButton;
