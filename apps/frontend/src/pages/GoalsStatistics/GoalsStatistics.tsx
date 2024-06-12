import { Empty, Tabs, TabsProps, Typography, notification } from "antd";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { ByDayEntity, ByHourEntity } from "../../api/data-contracts";
import ChartFilters from "../../components/common/ChartFilters/ChartFilters";
import {
  getWeekDay,
  hours,
} from "../../components/common/DeviceChart/chartLabels";
import queryKeys from "../../constants/queryKeys";
import useSetPageTitle from "../../hooks/useSetPageTitle";
import ChartProvider from "../../providers/ChartProiveder";
import filterStore from "../../store/FilterStore";
import { ChartGoal } from "../../types/chartGoals";
import { DateFilters } from "../../types/common";
import { getRandomColor } from "../../utils/getRandomColor";
import api from "./api";

const GoalsStatistics: FC = () => {
  const { t } = useTranslation();

  const { Title } = Typography;

  const filters = filterStore.useState();

  useSetPageTitle(t("titles.deviceCharts"));

  const [activeTab, setActiveTab] = useState("days");

  const [date, setDate] = useState<DateFilters>({
    startDate: dayjs().startOf("month"),
    endDate: dayjs().endOf("month"),
  });

  const { data: goalAchieve } = useQuery({
    queryKey: [
      queryKeys.getGoalAchieve,
      activeTab,
      filters,
      date.startDate,
      date.endDate,
    ],
    queryFn: () => api.getGoalAchieves(filters, activeTab, date),
    onError: () => {
      notification.error({
        message: t("deviceCharts.queries.get.error"),
      });
    },
    enabled: Boolean(filters.filters.goalIds.length),
  });

  const getAchieve = (item: ByDayEntity | ByHourEntity) => {
    if (activeTab === "days") {
      return { day: (item as ByDayEntity).day, count: item.count };
    }
    return { hour: (item as ByHourEntity).hour, count: item.count };
  };

  const formattedData = goalAchieve?.data.reduce((acc: ChartGoal[], item) => {
    const existingItem = acc.find((i) => i.goalId === item.goalId);
    if (existingItem) {
      existingItem.achieves.push(getAchieve(item));
      existingItem.achieves.sort(
        (a, b) =>
          Number(a[activeTab === "days" ? "day" : "hour"]) -
          Number(b[activeTab === "days" ? "day" : "hour"])
      );
    } else {
      acc.push({
        goalName: item.goalName,
        goalId: item.goalId,
        achieves: [getAchieve(item)],
      });
    }

    return acc;
  }, []);

  const dataSets = formattedData?.map((item) => {
    const timeUnits = Array.from(
      { length: activeTab === "days" ? 7 : 24 },
      (_, i) => (activeTab === "days" ? i + 1 : i)
    );
    const timeUnitsCount = timeUnits.map((timeUnit) => {
      const achieve = item.achieves.find(
        (achieve) => achieve[activeTab === "days" ? "day" : "hour"] === timeUnit
      );
      return achieve ? achieve.count : "0";
    });

    const randomColor = `${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()}`;

    const newData = {
      label: item.goalName,
      data: timeUnitsCount,
      borderColor: `rgb(${randomColor})`,
      backgroundColor: `rgba(${randomColor}, 0.5)`,
    };

    return newData;
  });

  const chartComponent = dataSets?.length ? (
    <Line
      data={{
        labels:
          activeTab === "days"
            ? Object.values(getWeekDay(t))
            : Object.values(hours),
        datasets: dataSets || [],
      }}
      height={"100vh"}
    />
  ) : (
    <Empty />
  );

  const items: TabsProps["items"] = [
    {
      key: "days",
      label: t("deviceCharts.tabs.days"),
      children: chartComponent,
    },
    {
      key: "hours",
      label: t("deviceCharts.tabs.hours"),
      children: chartComponent,
    },
  ];

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <ChartProvider>
      <Title style={{ textAlign: "center" }}>{t("titles.deviceCharts")}</Title>
      <ChartFilters date={date} setDate={setDate} />
      <Tabs
        defaultActiveKey={activeTab}
        items={items}
        onChange={handleTabChange}
        centered
      />
    </ChartProvider>
  );
};

export default GoalsStatistics;
