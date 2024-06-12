import { Button, Form, notification } from "antd";
import { AxiosError } from "axios";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import {
  CreateGoalDto,
  GoalControllerCreateError,
  GoalEntity,
  UpdateGoalDto,
} from "../../../api/data-contracts";
import queryKeys from "../../../constants/queryKeys";
import api from "../../../pages/Goals/api";
import userProfileStore from "../../../store/UserProfileStore";
import { DrawerState, IDrawerHandler } from "../../../types/common";
import { deleteEmptyKeys } from "../../../utils/deleteEmptyKeys";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage";
import { renderFormItems } from "../../../utils/renderFormItems";
import { getFormItems } from "./formItems.data";

interface Props {
  drawerState: DrawerState;
  refetch: () => void;
  handleDrawerState: IDrawerHandler<GoalEntity>;
  goal: GoalEntity | null;
}

const GoalForm: FC<Props> = ({
  drawerState,
  refetch,
  handleDrawerState,
  goal,
}) => {
  const { t } = useTranslation();

  const mutationFn =
    drawerState === "add"
      ? (formData: CreateGoalDto) => {
          const payload = {
            ...formData,
            organizationId:
              userProfileStore.getRawState().organizationId ||
              formData.organizationId,
          };
          deleteEmptyKeys(payload, ["organizationId", "code"]);
          return api.addGoal(payload);
        }
      : (formData: UpdateGoalDto) => {
          deleteEmptyKeys(formData, ["code"]);
          return api.editGoal(formData, +goal!.id);
        };

  const mutationKey =
    drawerState === "add" ? queryKeys.addGoal : queryKeys.editGoal;

  const successMessage =
    drawerState === "add"
      ? t("goals.queries.post.success")
      : t("goals.queries.patch.success");
  const errorMessage =
    drawerState === "add"
      ? t("goals.queries.post.error")
      : t("goals.queries.patch.error");

  const { mutate, isLoading } = useMutation({
    mutationKey: [mutationKey],
    mutationFn,
    onSuccess: () => {
      refetch();
      notification.success({
        message: successMessage,
      });
      handleDrawerState(false, "", null);
    },
    onError: (error: AxiosError<GoalControllerCreateError>) => {
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

  const handleSubmit = (formData: CreateGoalDto) => {
    mutate(formData);
  };

  const okButtonText =
    drawerState === "add" ? t("buttons.add") : t("buttons.edit");

  return (
    <Form<CreateGoalDto> onFinish={handleSubmit}>
      {renderFormItems<GoalEntity>(getFormItems(goal, t), t)}
      <Button type="primary" htmlType="submit" loading={isLoading}>
        {okButtonText}
      </Button>
    </Form>
  );
};

export default GoalForm;
