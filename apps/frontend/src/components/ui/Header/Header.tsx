import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Col, Layout, Row, Space, notification, theme } from "antd";
import { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import queryKeys from "../../../constants/queryKeys";
import routes from "../../../constants/routes";
import api from "../../../pages/Login/api";
import userProfileStore from "../../../store/UserProfileStore";
import UserNotification from "../../common/UserNotification/UserNotification";

interface Props {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  sidebarWidth: number;
  transition: number;
}

const Header: FC<Props> = ({
  collapsed,
  setCollapsed,
  sidebarWidth,
  transition,
}) => {
  const { Header } = Layout;

  const { t } = useTranslation();

  const navigate = useNavigate();

  const userName = userProfileStore.useState((s) => s.name);

  const { mutate: logoutMutate, isLoading: isLogoutMutateLoading } =
    useMutation({
      mutationKey: [queryKeys.logout],
      mutationFn: () => api.logout(),
      onSuccess: () => {
        localStorage.removeItem("accessToken");
        navigate(routes.auth);
      },
      onError: () => {
        notification.error({
          message: t("logout.error"),
        });
      },
    });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header
      style={{
        background: colorBgContainer,
        paddingLeft: collapsed
          ? `${sidebarWidth - 220}px`
          : `${sidebarWidth}px`,
        transition: `${transition}s`,
      }}
      className="header"
    >
      <Row align={"middle"} justify={"space-between"}>
        <Col>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="collapse-button"
          />
        </Col>
        <Col>
          <Space size={20}>
            <UserNotification />
            <b>{userName}</b>
            <Button
              icon={<LogoutOutlined />}
              loading={isLogoutMutateLoading}
              onClick={() => logoutMutate()}
            >
              {t("titles.exit")}
            </Button>
          </Space>
        </Col>
      </Row>
    </Header>
  );
};

export default Header;
