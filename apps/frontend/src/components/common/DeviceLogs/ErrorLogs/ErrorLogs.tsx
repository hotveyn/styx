import { notification } from "antd";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { DeviceEntity, LogErrorEntity } from "../../../../api/data-contracts";
import { refetchInterval } from "../../../../constants/common";
import queryKeys from "../../../../constants/queryKeys";
import filterStore from "../../../../store/FilterStore";
import Table from "../../../ui/Table/Table";
import api from "../api";
import { getGroupLogsColumns } from "../groupLogs.columns";
import { getLogsColumns } from "../logs.columns";

interface Props {
  device?: DeviceEntity;
  setCount?: Dispatch<SetStateAction<string | null>>;
  logsType: "error" | "groupError";
}

const ErrorLogs: FC<Props> = ({ device, setCount, logsType }) => {
  const filters = filterStore.useState();

  const { pathname } = useLocation();

  const { t } = useTranslation();

  const { data: errorsData, isFetching: isErrorsLoading } = useQuery({
    queryKey: [queryKeys.getErrorLogs, filters],
    queryFn: () => api.getLogs(filters, logsType, device!.code),
    onError: () => {
      notification.error({
        message: t("logs.queries.get.error"),
      });
    },
    keepPreviousData: true,
    enabled: logsType === "error",
  });

  const { data: groupErrorsData, isFetching: isGroupErrorsDataLoading } =
    useQuery({
      queryKey: [queryKeys.getGroupErrorLogs, filters],
      queryFn: () => api.getGroupLogs(filters, logsType),
      onError: () => {
        notification.error({
          message: t("logs.queries.get.error"),
        });
      },
      keepPreviousData: true,
      enabled: logsType === "groupError",
      refetchInterval,
    });

  useEffect(() => {
    if (!isErrorsLoading && setCount) {
      setCount(errorsData?.count || "0");
    }
  }, [isErrorsLoading]);

  return logsType === "groupError" ? (
    <Table<LogErrorEntity>
      columns={getGroupLogsColumns(t, pathname)}
      dataSource={groupErrorsData?.data}
      isLoading={isGroupErrorsDataLoading}
      total={groupErrorsData?.count as string}
      hasSearch={false}
      isFilterCleared={false}
      hasDatePicker={false}
    />
  ) : (
    <Table<LogErrorEntity>
      columns={getLogsColumns(t)}
      dataSource={errorsData?.data}
      isLoading={isErrorsLoading}
      total={errorsData?.count as string}
      hasSearch={false}
      isFilterCleared={false}
    />
  );
};

export default ErrorLogs;
