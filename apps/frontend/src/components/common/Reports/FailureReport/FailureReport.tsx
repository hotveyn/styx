import { notification } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { ActivityEntity } from "../../../../api/data-contracts";
import queryKeys from "../../../../constants/queryKeys";
import api from "../../../../pages/Reports/api";
import filterStore from "../../../../store/FilterStore";
import Table from "../../../ui/Table/Table";
import { getFailureReportColumns } from "./failureReport.columns";

const FailureReport: FC = () => {
  const filters = filterStore.useState();

  const { t } = useTranslation();

  const { data: failureReport, isFetching: isFailureReportLoading } = useQuery({
    queryKey: [queryKeys.getFailureReport, filters],
    queryFn: () => api.getFailureReportData(filters),
    onError: () => {
      notification.error({
        message: t("reports.queries.get.error"),
      });
    },
    enabled: Boolean(filters.period.startDate),
  });

  return (
    <Table<ActivityEntity>
      columns={getFailureReportColumns(t)}
      dataSource={failureReport?.data}
      isLoading={isFailureReportLoading}
      total={failureReport?.count as string}
      hasSearch={false}
      hasDatePicker={false}
      rowKey="date"
    />
  );
};

export default FailureReport;
