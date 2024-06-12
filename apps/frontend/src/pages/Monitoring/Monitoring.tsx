import {
  Button,
  Col,
  Form,
  Row,
  Tabs,
  TabsProps,
  Typography,
  notification,
} from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import DeviceFailureNotifications from "../../components/common/DeviceFailureNotifications/DeviceFailureNotifications";
import ErrorLogs from "../../components/common/DeviceLogs/ErrorLogs/ErrorLogs";
import InfoLogs from "../../components/common/DeviceLogs/InfoLogs/InfoLogs";
import MonitoringCard from "../../components/common/MonitoringCard/MonitoringCard";
import Loader from "../../components/ui/Loader/Loader";
import { getNavLabels, refetchInterval } from "../../constants/common";
import monitoringTranslationKeys from "../../constants/monitoringTranslationKeys";
import queryKeys from "../../constants/queryKeys";
import useSetPageTitle from "../../hooks/useSetPageTitle";
import filterStore from "../../store/FilterStore";
import userProfileStore from "../../store/UserProfileStore";
import { renderFormItems } from "../../utils/renderFormItems";
import monitoringApi from "./api";

const Monitoring: FC = () => {
  const { t } = useTranslation();

  const { Title } = Typography;

  useSetPageTitle(getNavLabels(t).monitoring);

  const {
    filters: { organizationId },
  } = filterStore.useState();

  const isAdmin = Boolean(!userProfileStore.getRawState().organizationId);

  const { data: monitoringData, isLoading: isMonitoringLoading } = useQuery({
    queryKey: [queryKeys.getMonitoring, organizationId],
    queryFn: () => monitoringApi.getMonitoring(organizationId),
    onError: () => {
      notification.error({
        message: t("monitoring.queries.get.error"),
      });
    },
    refetchInterval,
  });

  const items: TabsProps["items"] = [
    {
      key: "info",
      destroyInactiveTabPane: true,
      label: t("monitoring.stats.logInfoCount"),
      children: <InfoLogs logsType="groupInfo" />,
    },
    {
      key: "error",
      label: t("monitoring.stats.logErrorCount"),
      destroyInactiveTabPane: true,
      children: <ErrorLogs logsType="groupError" />,
    },
    {
      key: "failure",
      destroyInactiveTabPane: true,
      label: `${t("titles.failureNotification")}`,
      children: <DeviceFailureNotifications />,
    },
  ];

  const handleTabChange = () => {
    filterStore.update((s) => ({
      ...s,
      pagination: {
        offset: 0,
        limit: 10,
      },
      period: {
        startDate: "",
        endDate: "",
      },
    }));
  };

  const handleSubmit = (formData: { organizationId: string }) => {
    filterStore.update((s) => ({
      ...s,
      filters: {
        ...s.filters,
        organizationId: formData.organizationId,
      },
    }));
  };

  return (
    <>
      <Title style={{ textAlign: "center" }}>{t("titles.monitoring")}</Title>
      <>
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
                  loading={isMonitoringLoading}
                  style={{ marginTop: "15px" }}
                >
                  {t("goalsStatistics.goalFilter.applyButton")}
                </Button>
              </Col>
            </Row>
          </Form>
        )}

        {!monitoringData ? (
          <Loader />
        ) : (
          <Row gutter={[16, 16]} justify={"center"}>
            {Object.entries(monitoringData).map((monitoringItem) => (
              <Col
                span={6}
                key={
                  monitoringItem[0] as keyof typeof monitoringTranslationKeys
                }
              >
                <MonitoringCard
                  titleKey={
                    monitoringItem[0] as keyof typeof monitoringTranslationKeys
                  }
                  count={monitoringItem[1]}
                />
              </Col>
            ))}
          </Row>
        )}
      </>

      <Tabs
        defaultActiveKey="info"
        items={items}
        onChange={handleTabChange}
        centered
      />
    </>
  );
};

export default Monitoring;
