import { CloseOutlined } from "@ant-design/icons";
import { Card, Descriptions, Tag } from "antd";
import { DescriptionsItemType } from "antd/es/descriptions";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { DeviceEntity } from "../../../api/data-contracts";
import { getNavLabels, statusesColor } from "../../../constants/common";
import statusTranslationKeys from "../../../constants/statusTranslationKeys";
import {
  DeviceKeyType,
  getDeviceFields,
} from "../../../pages/Devices/deviceFields.data";

interface Props {
  device: DeviceEntity;
}

const DeviceCard: FC<Props> = ({ device }) => {
  const { t } = useTranslation();

  const getTranslateStatus = (key: DeviceKeyType, status: string) => {
    if (key === "status")
      return (
        <Tag color={statusesColor[device.status]}>
          {t(
            statusTranslationKeys[status as keyof typeof statusTranslationKeys]
          )}
        </Tag>
      );
    return "";
  };

  const getFieldByKey = (key: DeviceKeyType) => {
    if (Array.isArray(key)) {
      return key.reduce((acc, k) => acc && (acc[k] as DeviceEntity), device);
    } else {
      return device[key];
    }
  };

  const descriptionItems: DescriptionsItemType[] = getDeviceFields(
    device.code,
    device.name
  ).map((deviceField, index) => {
    const field =
      getTranslateStatus(deviceField.key, device.status) ||
      getFieldByKey(deviceField.key);

    return {
      children: (
        <>
          {field || <CloseOutlined />} {deviceField.button}
        </>
      ),
      key: index,
      span: window.innerWidth < 1200 ? 3 : 1,
      label: t(deviceField.label),
    };
  });

  return (
    <Card
      title={`${getNavLabels(t).logsDevice} - ${device.name}`}
      bordered={false}
      style={{ marginBottom: "15px" }}
    >
      <Descriptions bordered size="small" items={descriptionItems} />
    </Card>
  );
};

export default DeviceCard;
