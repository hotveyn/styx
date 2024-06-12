import { ReactElement } from "react";
import { DeviceEntity } from "../../api/data-contracts";
import CopyButton from "../../components/ui/CopyButton/CopyButton";

export type DeviceKeyType = keyof DeviceEntity | (keyof DeviceEntity)[];

export const getDeviceFields: (
  copyText: string,
  deviceName: string
) => {
  label: string;
  key: DeviceKeyType;
  button?: ReactElement;
}[] = (copyText, deviceName) => {
  return [
    {
      label: "devices.columns.id",
      key: "id",
    },
    {
      label: "devices.columns.ip",
      key: "ip",
    },
    {
      label: "devices.columns.port",
      key: "port",
    },
    {
      label: "devices.columns.deviceType",
      key: "deviceType",
    },
    {
      label: "devices.columns.address",
      key: "address",
    },
    {
      label: "devices.columns.geo",
      key: "geo",
    },
    {
      label: "devices.columns.softwareType",
      key: "softwareType",
    },
    {
      label: "devices.columns.softwareVersion",
      key: "softwareVersion",
    },
    {
      label: "devices.columns.organizationName",
      key: ["organization", "name"],
    },
    {
      label: "devices.columns.status",
      key: "status",
    },
    {
      label: "devices.columns.sshParameters",
      key: "sshParameters",
    },
    {
      label: "devices.columns.code",
      key: "code",
      button: (
        <CopyButton
          copyText={copyText}
          entityKey="device"
          entityName={deviceName}
        />
      ),
    },
  ];
};
