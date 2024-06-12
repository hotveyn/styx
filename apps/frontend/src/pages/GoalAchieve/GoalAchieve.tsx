import { Button, Form, Typography, notification } from "antd";
import { AxiosError } from "axios";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { GoalAchieveControllerAchieveGoalError } from "../../api/data-contracts";
import { renderFormItems } from "../../utils/renderFormItems";
import api from "./api";
import { getFormItems } from "./formItems.data";

// component will be removed
const GoalAchieve: FC = () => {
  const { t } = useTranslation();

  const { Title } = Typography;

  const { mutate, isLoading } = useMutation({
    mutationKey: ["achieveGoal"],
    mutationFn: api.achieveGoal,
    onSuccess: () => {
      notification.success({
        message: "Цель достигнута",
      });
    },
    onError: (error: AxiosError<GoalAchieveControllerAchieveGoalError>) => {
      notification.error({
        message: error.message,
      });
    },
  });

  const handleSubmit = (formData: { goalCode: string; deviceCode: string }) => {
    mutate(formData);
  };

  return (
    <>
      <Title style={{ textAlign: "center" }}>Раздел для тестирования *</Title>
      <Form<{ goalCode: string; deviceCode: string }> onFinish={handleSubmit}>
        {renderFormItems(getFormItems(), t)}
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {"Добавить"}
        </Button>
      </Form>
    </>
  );
};

export default GoalAchieve;
