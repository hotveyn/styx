import { Button, notification } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { LongFailureEntity } from "../../../api/data-contracts";
import queryKeys from "../../../constants/queryKeys";
import api from "../../../pages/Monitoring/api";

interface Props {
  notify: LongFailureEntity;
  refetch: () => void;
}

const NotifyCheckButton: FC<Props> = ({ notify, refetch }) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useMutation({
    mutationKey: [queryKeys.checkFailureNotification],
    mutationFn: (id: string) => api.checkFailureNotificationById(id),
    onSuccess: () => {
      refetch();
      notification.success({
        message: t("failureNotification.queries.post.success"),
      });
    },
    onError: () => {
      notification.error({
        message: t("failureNotification.queries.post.error"),
      });
    },
  });

  const handleNotifyCheck = () => {
    mutate(notify.id);
  };

  return (
    <Button onClick={handleNotifyCheck} loading={isLoading}>
      {t("failureNotification.checkButton")}
    </Button>
  );
};

export default NotifyCheckButton;
