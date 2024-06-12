import { Layout, Menu, theme } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { version } from "../../../../package.json";
import logo from "../../../assets/logo_small.svg";
import userProfileStore from "../../../store/UserProfileStore";
import "./Sidebar.css";
import { getMenuItems } from "./nav";

interface Props {
  collapsed: boolean;
  width: number;
}

const Sidebar: FC<Props> = ({ collapsed, width }) => {
  const { t } = useTranslation();

  const { Sider } = Layout;

  const getDefaultKeys = (type: "selected" | "open") => {
    if (type === "selected") return [location.pathname];
    return [`/${location.pathname.split("/")[1]}`];
  };

  const isAdmin = Boolean(!userProfileStore.useState((s) => s.organization));

  const {
    token: { colorText },
  } = theme.useToken();

  return (
    <Sider
      width={width}
      className="sidebar"
      collapsible
      collapsed={collapsed}
      trigger={null}
      theme="light"
    >
      <div className="side-logo-wrapper">
        <img src={logo} className="side-logo" alt="Альфаматика" />
        <span style={{ color: colorText }}>Styx</span>
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={getDefaultKeys("selected")}
        defaultOpenKeys={getDefaultKeys("open")}
        className="menu"
        items={getMenuItems(t, isAdmin)}
      />
      <div className="version">v. {version}</div>
    </Sider>
  );
};

export default Sidebar;
