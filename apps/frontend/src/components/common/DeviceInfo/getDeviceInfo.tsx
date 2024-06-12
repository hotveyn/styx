import { CloseOutlined } from "@ant-design/icons";
import { DescriptionsProps, Tag } from "antd";
import dayjs from "dayjs";
import { TFunction } from "i18next";
import { DeviceEntity } from "../../../api/data-contracts";
import { formatDateTimeType, statusesColor } from "../../../constants/common";
import statusTranslationKeys from "../../../constants/statusTranslationKeys";
import CopyButton from "../../ui/CopyButton/CopyButton";

export const getDeviceInfo: (
  device: DeviceEntity,
  t: TFunction<"translation">
) => DescriptionsProps["items"] = (device, t) => {
  const columnSpan = 3;

  return [
    {
      key: "1",
      label: t("devices.columns.id"),
      children: device.id,
      span: columnSpan,
    },
    {
      key: "2",
      label: t("devices.columns.code"),
      children: (
        <>
          {device.code}{" "}
          <CopyButton
            copyText={device.code}
            entityName={device.name}
            entityKey="device"
          />
        </>
      ),
      span: columnSpan,
    },
    {
      key: "3",
      label: t("devices.columns.ip"),
      children: device.ip,
      span: columnSpan,
    },
    {
      key: "4",
      label: t("devices.columns.port"),
      children: device.port,
      span: columnSpan,
    },
    {
      key: "5",
      label: t("devices.columns.name"),
      children: device.name,
      span: columnSpan,
    },
    {
      key: "6",
      label: t("devices.columns.deviceType"),
      children: device.deviceType,
      span: columnSpan,
    },
    {
      key: "7",
      label: t("devices.columns.address"),
      children: device.address,
      span: columnSpan,
    },
    {
      key: "8",
      label: t("devices.columns.geo"),
      children: device.geo.includes("null")
        ? t("devices.drawer.emptyGeo")
        : device.geo,
      span: columnSpan,
    },
    {
      key: "9",
      label: t("devices.columns.softwareType"),
      children: device.softwareType || <CloseOutlined />,
      span: columnSpan,
    },
    {
      key: "10",
      label: t("devices.columns.softwareVersion"),
      children: device.softwareVersion || <CloseOutlined />,
      span: columnSpan,
    },
    {
      key: "11",
      label: t("devices.columns.organizationName"),
      children: device.organization?.name || <CloseOutlined />,
      span: columnSpan,
    },
    {
      key: "12",
      label: t("devices.columns.status"),
      children: (
        <Tag color={statusesColor[device.status]}>
          {t(
            statusTranslationKeys[
              device.status as keyof typeof statusTranslationKeys
            ]
          )}
        </Tag>
      ),
      span: columnSpan,
    },
    {
      key: "13",
      label: t("devices.columns.sshParameters"),
      children: device.sshParameters || <CloseOutlined />,
      span: columnSpan,
    },
    {
      key: "14",
      label: t("devices.columns.additionalData"),
      children: device.additionalData || <CloseOutlined />,
      span: columnSpan,
    },
    {
      key: "15",
      label: t("devices.columns.createdAt"),
      children: dayjs(device.createdAt).format(formatDateTimeType),
      span: 3,
    },
  ];
};
