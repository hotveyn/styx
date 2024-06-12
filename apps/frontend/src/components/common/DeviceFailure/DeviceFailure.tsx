import { notification } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { DeviceEntity, FailureEntity } from "../../../api/data-contracts";
import queryKeys from "../../../constants/queryKeys";
import filterStore from "../../../store/FilterStore";
import Table from "../../ui/Table/Table";
import api from "./api";
import { getDevicesFailuresColumns } from "./deviceFailures.columns";

interface Props {
  device: DeviceEntity;
}

const DeviceFailure: FC<Props> = ({ device }) => {
  const { t } = useTranslation();

  const filters = filterStore.useState();

  const { data: deviceFailures, isFetching: isDeviceFailuresLoading } =
    useQuery({
      queryKey: [queryKeys.getDeviceFailures],
      queryFn: () => api.getDeviceFailures(device.id, filters),
      onError: () => {
        notification.error({
          message: t("deviceFailures.queries.get.error"),
        });
      },
    });

  return (
    <Table<FailureEntity>
      columns={getDevicesFailuresColumns(t)}
      dataSource={deviceFailures?.data}
      isLoading={isDeviceFailuresLoading}
      total={deviceFailures?.count as string}
      hasSearch={false}
      hasDatePicker={false}
    />
  );
};

export default DeviceFailure;
