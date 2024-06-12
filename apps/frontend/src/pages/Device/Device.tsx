import { Card, Col, Row, notification } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import DeviceChart from "../../components/common/DeviceChart/DeviceChart";
import DeviceLogs from "../../components/common/DeviceLogs/DeviceLogs";
import BackButton from "../../components/ui/BackButton/BackButton";
import DeviceCard from "../../components/ui/DeviceCard/DeviceCard";
import Loader from "../../components/ui/Loader/Loader";
import { getNavLabels } from "../../constants/common";
import queryKeys from "../../constants/queryKeys";
import routes from "../../constants/routes";
import useSetPageTitle from "../../hooks/useSetPageTitle";
import api from "../Devices/api";

const Device: FC = () => {
  const { t } = useTranslation();

  const { id: deviceId } = useParams();

  const { data: deviceData, isFetching: isDeviceLoading } = useQuery({
    queryKey: [queryKeys.getDevices],
    queryFn: () => api.getDeviceByCode(deviceId || ""),
    onError: () => {
      notification.error({
        message: t("devices.queries.getOne.error"),
      });
    },
  });

  useSetPageTitle(`${getNavLabels(t).device} - ${deviceData?.name}`);

  return !isDeviceLoading && deviceData ? (
    <>
      <BackButton link={`${routes.devices}`} />

      <DeviceCard device={deviceData} />
      <Row gutter={[15, 15]}>
        <Col md={24} xl={12}>
          <Card>
            <DeviceLogs device={deviceData} />
          </Card>
        </Col>
        <Col md={24} xl={12}>
          <Card>
            <DeviceChart deviceId={deviceData.id} />
          </Card>
        </Col>
      </Row>
    </>
  ) : (
    <Loader />
  );
};

export default Device;
