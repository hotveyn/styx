import { Button, Form, Typography, notification, theme } from "antd";
import { AxiosError } from "axios";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { AuthControllerLoginError, LoginDto } from "../../api/data-contracts";
import queryKeys from "../../constants/queryKeys";
import routes from "../../constants/routes";
import useSetPageTitle from "../../hooks/useSetPageTitle";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";
import { renderFormItems } from "../../utils/renderFormItems";
import resetStore from "../../utils/resetStore";
import "./Login.css";
import api from "./api";
import { getFormItems } from "./formItems.data";

const Login: FC = () => {
  const { Title } = Typography;

  const { t } = useTranslation();

  useSetPageTitle(t("auth.title"));

  const navigate = useNavigate();

  const errorMessage = t("auth.queries.post.error");

  const { mutate, isLoading } = useMutation({
    mutationKey: [queryKeys.login],
    mutationFn: (formData: LoginDto) => api.login(formData),
    onSuccess: (data) => {
      navigate(`${routes.monitoring}`);

      localStorage.setItem("accessToken", data.accessToken);
    },
    onError: (error: AxiosError<AuthControllerLoginError>) => {
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

  const handleSubmit = (formData: LoginDto) => {
    mutate(formData);
  };

  useEffect(() => {
    resetStore();
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div className="login-wrapper" style={{ background: colorBgContainer }}>
      <div className="login-form">
        <Title>{t("auth.title")}</Title>
        <Form<LoginDto>
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{ maxWidth: "400px" }}
          onFinish={handleSubmit}
        >
          {renderFormItems(getFormItems(t), t)}

          <Button
            type="primary"
            htmlType="submit"
            className="login-button"
            loading={isLoading}
          >
            {t("auth.form.button")}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
