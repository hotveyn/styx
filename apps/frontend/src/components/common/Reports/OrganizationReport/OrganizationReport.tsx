import { Button, Col, Form, Row, notification } from "antd";
import { FC, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import queryKeys from "../../../../constants/queryKeys";
import monitoringApi from "../../../../pages/Monitoring/api";
import organizationsApi from "../../../../pages/Organizations/api";
import ChartProvider from "../../../../providers/ChartProiveder";
import userProfileStore from "../../../../store/UserProfileStore";
import { renderFormItems } from "../../../../utils/renderFormItems";

const OrganizationReport: FC = () => {
  const { t } = useTranslation();

  const [organizationId, setOrganizationId] = useState("");

  const isAdmin = Boolean(!userProfileStore.getRawState().organizationId);

  const { data: organizationReport, isFetching: isOrganizationReportLoading } =
    useQuery({
      queryKey: [queryKeys.getOrganizationReport, organizationId],
      queryFn: () => monitoringApi.getMonitoring(organizationId),
      onError: () => {
        notification.error({
          message: t("reports.queries.get.error"),
        });
      },
    });

  const { data: organization } = useQuery({
    queryKey: [queryKeys.getOrganization, organizationId],
    queryFn: () => organizationsApi.getOrganizationById(organizationId),
    onError: () => {
      notification.error({
        message: t("organizations.queries.get.error"),
      });
    },
    enabled: Boolean(organizationId),
  });

  if (!organizationReport) return <></>;

  const labels = Object.keys(organizationReport);

  const data = {
    labels,
    datasets: [
      {
        label: organizationId ? organization?.data[0].name : "Все организации",
        data: labels?.map(
          (_, index) => Object.values(organizationReport)[index]
        ),
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };

  const handleSubmit = (formData: { organizationId: string }) => {
    setOrganizationId(formData.organizationId);
  };

  return (
    <ChartProvider>
      {isAdmin && (
        <Form onFinish={handleSubmit} style={{ maxWidth: "400px" }}>
          <Row align={"middle"} gutter={[20, 20]}>
            <Col span={20}>
              {renderFormItems(
                [
                  {
                    columnSpan: 24,
                    items: [
                      {
                        initialValue: null,
                        locales: {
                          label: "",
                          placeholder:
                            "cameras.drawer.fields.organization.placeholder",
                        },
                        name: "organizationId",
                        observerSelect: {
                          entityType: "organizations",
                        },
                        inputType: "observerSelect",
                        rules: [],
                      },
                    ],
                  },
                ],
                t
              )}
            </Col>
            <Col span={4}>
              <Button
                type="primary"
                htmlType="submit"
                loading={isOrganizationReportLoading}
                style={{ marginTop: "15px" }}
              >
                {t("goalsStatistics.goalFilter.applyButton")}
              </Button>
            </Col>
          </Row>
        </Form>
      )}
      <Bar data={data} height={"100vh"} />
    </ChartProvider>
  );
};

export default OrganizationReport;
