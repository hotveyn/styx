import { Button, Empty, Layout } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useSetPageTitle from "../../hooks/useSetPageTitle";
import "./NotFound.css";

const NotFound: FC = () => {
  const { t } = useTranslation();

  const title = t("notFound.title");

  useSetPageTitle(title);

  return (
    <Layout>
      <div className="not-found">
        <Empty description={title} className="empty" />
        <Link to="/">
          <Button type="primary">{t("notFound.button")}</Button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
