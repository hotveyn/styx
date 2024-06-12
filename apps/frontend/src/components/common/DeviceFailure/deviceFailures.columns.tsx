import { CloseOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { TFunction } from "i18next";
import { FailureEntity } from "../../../api/data-contracts";
import { formatDateTimeType } from "../../../constants/common";

export const getDevicesFailuresColumns = (
  t: TFunction<"translation">
): ColumnsType<FailureEntity> => {
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
  ];
};
