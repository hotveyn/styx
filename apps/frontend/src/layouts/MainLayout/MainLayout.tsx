import { Layout, notification } from "antd";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Outlet } from "react-router-dom";
import Header from "../../components/ui/Header/Header";
import Loader from "../../components/ui/Loader/Loader";
import Sidebar from "../../components/ui/Sidebar/Sidebar";
import queryKeys from "../../constants/queryKeys";
import userApi from "../../pages/Users/api";
import userProfileStore from "../../store/UserProfileStore";
import "./MainLayout.css";

const MainLayout: FC = () => {
  const { Content } = Layout;

  const { t } = useTranslation();

  const [collapsed, setCollapsed] = useState(false);

  const sidebarWidth = 300;
  const transition = 0.3;

  const { isLoading } = useQuery({
    queryKey: [queryKeys.getUserInfo],
    queryFn: () => userApi.getUserInfo(),
    onSuccess: (data) => {
      userProfileStore.update(() => data);
    },
    onError: () => {
      notification.error({
        message: t("users.queries.get.profileError"),
      });
    },
  });

  return isLoading ? (
    <Loader className="large" />
  ) : (
    <>
      <Layout>
        <Header
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          sidebarWidth={sidebarWidth}
          transition={transition}
        />
      </Layout>
      <Layout hasSider>
        <Sidebar collapsed={collapsed} width={sidebarWidth} />
        <Content
          className="content-wrapper"
          style={{
            paddingLeft: collapsed
              ? `${sidebarWidth - 200}px`
              : `${sidebarWidth + 20}px`,
            transition: `${transition}s`,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </>
  );
};

export default MainLayout;
