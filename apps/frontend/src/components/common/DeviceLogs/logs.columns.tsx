import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { TFunction } from "i18next";
import { LogInfoEntity } from "../../../api/data-contracts";
import { formatDateTimeType } from "../../../constants/common";

export const getLogsColumns = (
  t: TFunction<"translation">
): ColumnsType<LogInfoEntity> => {
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
      title: t("logs.columns.body"),
      dataIndex: "body",
    },
  ];
};
