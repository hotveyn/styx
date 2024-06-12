import { notification } from "antd";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { DeviceEntity, LogInfoEntity } from "../../../../api/data-contracts";
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
  logsType: "info" | "groupInfo";
}

const InfoLogs: FC<Props> = ({ device, setCount, logsType }) => {
  const filters = filterStore.useState();

  const { pathname } = useLocation();

  const { t } = useTranslation();

  const { data: logsData, isFetching: isLogsLoading } = useQuery({
    queryKey: [queryKeys.getInfoLogs, filters],
    queryFn: () => api.getLogs(filters, logsType, device!.code),
    onError: () => {
      notification.error({
        message: t("logs.queries.get.error"),
      });
    },
    keepPreviousData: true,
    enabled: logsType === "info",
  });

  const { data: groupLogsData, isFetching: isGroupLogsDataLoading } = useQuery({
    queryKey: [queryKeys.getInfoLogs, filters],
    queryFn: () => api.getGroupLogs(filters, logsType),
    onError: () => {
      notification.error({
        message: t("logs.queries.get.error"),
      });
    },
    keepPreviousData: true,
    enabled: logsType === "groupInfo",
    refetchInterval,
  });

  useEffect(() => {
    if (!isLogsLoading && setCount) {
      setCount(logsData?.count || "0");
    }
  }, [isLogsLoading]);

  return logsType === "groupInfo" ? (
    <Table<LogInfoEntity>
      columns={getGroupLogsColumns(t, pathname)}
      dataSource={groupLogsData?.data}
      isLoading={isGroupLogsDataLoading}
      total={groupLogsData?.count as string}
      hasSearch={false}
      isFilterCleared={false}
      hasDatePicker={false}
    />
  ) : (
    <Table<LogInfoEntity>
      columns={getLogsColumns(t)}
      dataSource={logsData?.data}
      isLoading={isLogsLoading}
      total={logsData?.count as string}
      hasSearch={false}
      isFilterCleared={false}
    />
  );
};

export default InfoLogs;
