import FailureReport from "../../components/common/Reports/FailureReport/FailureReport";
import OrganizationReport from "../../components/common/Reports/OrganizationReport/OrganizationReport";

export const reportTypes = {
  activity: "reports.reportType.activity",
  organizations: "reports.reportType.organizations",
};

export const reportElements = [
  { key: "activity", element: <FailureReport /> },
  { key: "organizations", element: <OrganizationReport /> },
];
