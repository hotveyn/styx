import { Button, notification } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { LongFailureEntity } from "../../../api/data-contracts";
import { refetchInterval } from "../../../constants/common";
import queryKeys from "../../../constants/queryKeys";
import api from "../../../pages/Monitoring/api";
import { getDeviceFailureNotificationColumns } from "../../../pages/Monitoring/failureNotification.columns";
import filterStore from "../../../store/FilterStore";
import Table from "../../ui/Table/Table";

const DeviceFailureNotifications: FC = () => {
  const { t } = useTranslation();

  const { pathname } = useLocation();

  const filters = filterStore.useState();

  const {
    data,
    isFetching: isFailureNotificationLoading,
    refetch,
  } = useQuery({
    queryKey: [queryKeys.getFailureNotification, filters],
    queryFn: () => api.getFailureNotifications(filters),
    onError: () => {
      notification.error({
        message: t("failureNotification.queries.get.error"),
      });
    },
    keepPreviousData: true,
    refetchInterval,
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: [queryKeys.checkAllFailureNotification],
    mutationFn: () => api.checkAllFailureNotification(),
    onSuccess: () => {
      refetch();
      notification.success({
        message: t("failureNotification.queries.postAll.success"),
      });
    },
    onError: () => {
      notification.error({
        message: t("failureNotification.queries.postAll.error"),
      });
    },
  });

  const handleCheckAllNotify = () => {
    mutate();
  };

  const isCheckAllButtonVisible = !data?.data.every((notify) => notify.checked);

  return (
    <>
      {isCheckAllButtonVisible && (
        <Button onClick={handleCheckAllNotify} loading={isLoading}>
          {t("failureNotification.checkAllButton")}
        </Button>
      )}
      <Table<LongFailureEntity>
        columns={getDeviceFailureNotificationColumns(t, refetch, pathname)}
        dataSource={data?.data}
        isLoading={isFailureNotificationLoading}
        total={data?.count as string}
        hasSearch={false}
        hasDatePicker={false}
      />
    </>
  );
};

export default DeviceFailureNotifications;
