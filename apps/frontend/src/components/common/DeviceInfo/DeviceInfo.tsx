import { Descriptions } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { DeviceEntity } from "../../../api/data-contracts";
import { getDeviceInfo } from "./getDeviceInfo";

interface Props {
  device: DeviceEntity;
}

const DeviceInfo: FC<Props> = ({ device }) => {
  const { t } = useTranslation();

  return (
    <Descriptions items={getDeviceInfo(device, t)} bordered size="small" />
  );
};

export default DeviceInfo;
