import { Tabs, TabsProps, Typography } from "antd";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { DeviceEntity } from "../../../api/data-contracts";
import queryKeys from "../../../constants/queryKeys.ts";
import filterStore from "../../../store/FilterStore.ts";
import ErrorLogs from "./ErrorLogs/ErrorLogs.tsx";
import FailureLogs from "./FailureLogs/FailureLogs.tsx";
import InfoLogs from "./InfoLogs/InfoLogs.tsx";
import api from "./api.ts";

interface Props {
  device: DeviceEntity;
}

const DeviceLogs: FC<Props> = ({ device }) => {
  const { t } = useTranslation();

  const { Title } = Typography;

  const [infoLogsCount, setInfoLogsCount] = useState<string | null>(null);
  const [errorLogsCount, setErrorLogsCount] = useState<string | null>(null);
  const [failureLogsCount, setFailureLogsCount] = useState<string | null>(null);

  const { data: logsData } = useQuery({
    queryKey: [queryKeys.getInfoLogs],
    queryFn: () => api.getLogs(filterStore.getRawState(), "info", device.code),
    enabled: infoLogsCount === null,
  });

  const { data: errorsData } = useQuery({
    queryKey: [queryKeys.getErrorLogs],
    queryFn: () => api.getLogs(filterStore.getRawState(), "error", device.code),
    enabled: errorLogsCount === null,
  });

  const { data: deviceFailures } = useQuery({
    queryKey: [queryKeys.getDeviceFailures],
    queryFn: () => api.getDeviceFailures(device.id, filterStore.getRawState()),
    enabled: failureLogsCount === null,
  });

  useEffect(() => {
    if (logsData) {
      setInfoLogsCount(logsData.count);
    }
  }, [logsData]);

  useEffect(() => {
    if (errorsData) {
      setErrorLogsCount(errorsData.count);
    }
  }, [errorsData]);

  useEffect(() => {
    if (deviceFailures) {
      setFailureLogsCount(deviceFailures.count);
    }
  }, [deviceFailures]);

  const items: TabsProps["items"] = [
    {
      key: "info",
      destroyInactiveTabPane: true,
      label: `${t("logs.tabs.info")} (${infoLogsCount})`,
      children: (
        <InfoLogs device={device} setCount={setInfoLogsCount} logsType="info" />
      ),
    },
    {
      key: "error",
      label: `${t("logs.tabs.error")} (${errorLogsCount})`,
      destroyInactiveTabPane: true,
      children: (
        <ErrorLogs
          device={device}
          setCount={setErrorLogsCount}
          logsType="error"
        />
      ),
    },
    {
      key: "failure",
      destroyInactiveTabPane: true,
      label: `${t("titles.deviceFailures")} (${failureLogsCount})`,
      children: <FailureLogs device={device} setCount={setFailureLogsCount} />,
    },
  ];

  const handleTabChange = () => {
    filterStore.update((s) => ({
      ...s,
      pagination: {
        offset: 0,
        limit: 10,
      },
      period: {
        startDate: "",
        endDate: "",
      },
    }));
  };

  return (
    <>
      <Title style={{ textAlign: "center" }}>{t("titles.logs")}</Title>

      <Tabs
        defaultActiveKey="info"
        items={items}
        onChange={handleTabChange}
        centered
      />
    </>
  );
};

export default DeviceLogs;
