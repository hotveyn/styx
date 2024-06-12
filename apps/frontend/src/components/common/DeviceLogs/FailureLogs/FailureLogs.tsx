import { notification } from "antd";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { DeviceEntity, FailureEntity } from "../../../../api/data-contracts";
import queryKeys from "../../../../constants/queryKeys";
import filterStore from "../../../../store/FilterStore";
import Table from "../../../ui/Table/Table";
import { getDevicesFailuresColumns } from "../../DeviceFailure/deviceFailures.columns";
import api from "../api";

interface Props {
  device: DeviceEntity;
  setCount: Dispatch<SetStateAction<string | null>>;
}

const FailureLogs: FC<Props> = ({ device, setCount }) => {
  const filters = filterStore.useState();

  const { t } = useTranslation();

  const { data: deviceFailures, isFetching: isDeviceFailuresLoading } =
    useQuery({
      queryKey: [queryKeys.getDeviceFailures, filters],
      queryFn: () => api.getDeviceFailures(device.id, filters),
      onError: () => {
        notification.error({
          message: t("logs.queries.get.error"),
        });
      },
    });

  useEffect(() => {
    if (!isDeviceFailuresLoading) {
      setCount(deviceFailures?.count || "0");
    }
  }, [isDeviceFailuresLoading]);

  return (
    <Table<FailureEntity>
      columns={getDevicesFailuresColumns(t)}
      dataSource={deviceFailures?.data}
      isLoading={isDeviceFailuresLoading}
      total={deviceFailures?.count as string}
      hasSearch={false}
      isFilterCleared={false}
    />
  );
};

export default FailureLogs;
