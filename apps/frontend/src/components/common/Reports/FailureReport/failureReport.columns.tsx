import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { TFunction } from "i18next";
import { ActivityEntity } from "../../../../api/data-contracts";
import { formatDateTimeType } from "../../../../constants/common";

export const getFailureReportColumns = (
  t: TFunction<"translation">
): ColumnsType<ActivityEntity> => {
  return [
    {
      title: t("reports.columns.failureReport.createdAt"),
      dataIndex: "date",
      align: "center",
      fixed: "left",
      render: (value) => <>{dayjs(value).format(formatDateTimeType)}</>,
      width: "200px",
    },
    {
      title: t("reports.columns.failureReport.failureCount"),
      dataIndex: "failurecount",
      align: "center",
      width: "150px",
    },
    {
      title: t("reports.columns.failureReport.errorCount"),
      dataIndex: "errorcount",
      align: "center",
      width: "150px",
    },
    {
      title: t("reports.columns.failureReport.infoCount"),
      dataIndex: "infocount",
      align: "center",
      width: "150px",
    },
  ];
};
