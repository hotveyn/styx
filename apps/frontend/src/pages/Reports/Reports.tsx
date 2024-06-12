import { Button, Col, DatePicker, Row, Typography } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Drawer from "../../components/ui/Drawer/Drawer";
import { formatDateTimeType, getNavLabels } from "../../constants/common";
import routes from "../../constants/routes";
import useSetPageTitle from "../../hooks/useSetPageTitle";
import filterStore from "../../store/FilterStore";
import { DateFilters, ReportPeriod } from "../../types/common";
import { reportElements, reportTypes } from "./reports.data";

const Reports: FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { reportName } = useParams();

  useSetPageTitle(
    `${t("reports.pageTitle")} ${t(`reports.reportType.${reportName}`).toLowerCase()}`
  );

  const [selectedPeriod, setSelectedPeriod] = useState<ReportPeriod>("day");
  const [date, setDate] = useState<DateFilters>({
    startDate: dayjs().startOf("day"),
    endDate: dayjs().endOf("day"),
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { Title } = Typography;

  const { RangePicker } = DatePicker;

  const buttonSize: SizeType = "middle";

  const renderReportDriver = () =>
    Object.entries(reportTypes).map((report) => (
      <Button
        onClick={() => {
          navigate(routes.reports.replace(":reportName", report[0]));

          handleButtonPeriodChange("day");

          setIsDrawerOpen(false);
        }}
        type={report[0] === reportName ? "primary" : "default"}
        block
        style={{ marginTop: "10px" }}
        key={report[0]}
      >
        {t(report[1])}
      </Button>
    ));

  useEffect(() => {
    filterStore.update((s) => ({
      ...s,
      period: {
        startDate: date.startDate?.format(),
        endDate: date.endDate?.format(),
      },
    }));
  }, [date]);

  const handleButtonPeriodChange = (period: ReportPeriod) => {
    filterStore.update((s) => ({
      ...s,
      pagination: {
        limit: 10,
        offset: 0,
      },
    }));

    setSelectedPeriod(period);

    setDate({
      startDate: dayjs().startOf(period),
      endDate: dayjs().endOf(period),
    });
  };

  const handlePeriodChange: RangePickerProps["onChange"] = (values) => {
    setDate({
      startDate: values ? dayjs(values[0]) : null,
      endDate: values ? dayjs(values[1]) : null,
    });

    filterStore.update((s) => ({
      ...s,
      pagination: {
        ...s,
        offset: 0,
      },
    }));

    if (values?.[0] || values?.[1]) {
      setDate({
        startDate: values[0],
        endDate: values[1],
      });

      return;
    }

    setDate({
      startDate: null,
      endDate: null,
    });
  };

  return (
    <>
      <Row style={{ marginBottom: "20px" }}>
        <Col>
          <Row align={"middle"}>
            <Col style={{ marginRight: "40px" }}>
              <Title level={2} style={{ marginBottom: 0 }}>
                {getNavLabels(t).reports}
              </Title>
            </Col>
            <Col style={{ marginRight: "30px" }}>
              <span style={{ marginBottom: "10px", display: "block" }}>
                {t("reports.text.period")}
              </span>
              <Row>
                <RangePicker
                  value={[date.startDate, date.endDate]}
                  format={formatDateTimeType}
                  onChange={handlePeriodChange}
                  showTime
                  allowClear={false}
                  disabledDate={(current) => {
                    return (
                      dayjs().add(-10, "year") >= current ||
                      dayjs().add(1, "year") <= current
                    );
                  }}
                />
              </Row>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row align={"bottom"} style={{ height: "100%" }}>
            <Col>
              <Row>
                <Col style={{ marginRight: "20px" }}>
                  <Button
                    size={buttonSize}
                    type={selectedPeriod === "day" ? "primary" : "default"}
                    onClick={() => handleButtonPeriodChange("day")}
                  >
                    {t("reports.buttons.today")}
                  </Button>
                </Col>
                <Col style={{ marginRight: "40px" }}>
                  <Button
                    size={buttonSize}
                    type={selectedPeriod === "month" ? "primary" : "default"}
                    onClick={() => handleButtonPeriodChange("month")}
                  >
                    {t("reports.buttons.month")}
                  </Button>
                </Col>
                {/* <Col>
                  <Button icon={<DownloadOutlined />} size={buttonSize}>
                    {t("reports.buttons.excel")}
                  </Button>
                </Col> */}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Button onClick={() => setIsDrawerOpen(true)}>
        {t("reports.text.reportType")}
      </Button>
      {reportElements.find((report) => report.key === reportName)?.element}
      <Drawer
        title={t("reports.text.reportType")}
        isVisible={isDrawerOpen}
        setIsVisible={setIsDrawerOpen}
        width="450px"
      >
        {renderReportDriver()}
      </Drawer>
    </>
  );
};

export default Reports;
