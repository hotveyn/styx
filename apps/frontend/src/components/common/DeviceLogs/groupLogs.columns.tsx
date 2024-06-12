import { Space, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { LogInfoEntity } from "../../../api/data-contracts";
import { formatDateTimeType } from "../../../constants/common";
import routes from "../../../constants/routes";
import CopyButton from "../../ui/CopyButton/CopyButton";

export const getGroupLogsColumns = (
  t: TFunction<"translation">,
  fromPath: string
): ColumnsType<LogInfoEntity> => {
  const { Text } = Typography;

  return [
    {
      title: t("logs.columns.requestTime"),
      dataIndex: "requestTime",
      align: "center",
      fixed: "left",
      width: "200px",
      render: (value) => <>{dayjs(value).format(formatDateTimeType)}</>,
    },
    {
      title: t("logs.columns.device"),
      dataIndex: ["device", "name"],
      render: (_, row) =>
        row.device?.code && (
          <Link
            to={routes.device.replace(":id", `${row.device.code}`)}
            state={{ previousPath: fromPath }}
          >
            <Text>{row.device.name}</Text>
          </Link>
        ),
    },
    {
      title: t("logs.columns.code"),
      dataIndex: ["device", "code"],
      render: (_, row) =>
        row.device?.code && (
          <Space size={4}>
            <span style={{ wordBreak: "break-all" }}>
              {row.device.code}{" "}
              <CopyButton
                copyText={row.device.code}
                entityKey="device"
                entityName={row.device.name}
              />
            </span>
          </Space>
        ),
    },
  ];
};
