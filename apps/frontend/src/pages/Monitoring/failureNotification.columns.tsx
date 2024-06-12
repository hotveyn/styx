import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { LongFailureEntity } from "../../api/data-contracts";
import NotifyCheckButton from "../../components/ui/NotifyCheckButton/NotifyCheckButton";
import { formatDateTimeType } from "../../constants/common";
import routes from "../../constants/routes";

export const getDeviceFailureNotificationColumns = (
  t: TFunction<"translation">,
  refetch: () => void,
  fromPath: string
): ColumnsType<LongFailureEntity> => {
  const { Text } = Typography;

  return [
    {
      title: t("deviceFailures.columns.createdAt"),
      dataIndex: "createdAt",
      align: "center",
      width: "15px",
      fixed: "left",
      render: (value) => <>{dayjs(value).format(formatDateTimeType)}</>,
    },
    {
      title: t("deviceFailures.columns.repairedDate"),
      dataIndex: "reparedDate",
      align: "center",
      width: "15px",
      render: (value) => (
        <>
          {value ? dayjs(value).format(formatDateTimeType) : <CloseOutlined />}
        </>
      ),
    },
    {
      title: t("deviceFailures.columns.comment"),
      dataIndex: "comment",
      width: "50px",
      render: (value) => value || <CloseOutlined />,
    },
    {
      title: t("deviceFailures.columns.device"),
      dataIndex: "device",
      width: "50px",
      render: (_, row) => (
        <Link
          style={{ textDecoration: "underline" }}
          to={routes.device.replace(":id", `${row.device.code}`)}
          state={{ previousPath: fromPath }}
        >
          <Text>{row.device.name}</Text>
        </Link>
      ),
    },
    {
      title: t("deviceFailures.columns.checked"),
      dataIndex: "checked",
      width: "15px",
      align: "center",
      fixed: "right",
      render: (value, row) =>
        value ? (
          <CheckOutlined />
        ) : (
          <NotifyCheckButton notify={row} refetch={refetch} />
        ),
    },
  ];
};
