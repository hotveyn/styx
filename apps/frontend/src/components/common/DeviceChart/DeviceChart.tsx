import { Empty, Tabs, TabsProps, Typography, notification } from "antd";
import dayjs from "dayjs";
import { FC, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { ByDayEntity, ByHourEntity } from "../../../api/data-contracts";
import queryKeys from "../../../constants/queryKeys";
import ChartProvider from "../../../providers/ChartProiveder";
import filterStore from "../../../store/FilterStore";
import { ChartGoal } from "../../../types/chartGoals";
import { DateFilters } from "../../../types/common";
import { getRandomColor } from "../../../utils/getRandomColor";
import ChartFilters from "../ChartFilters/ChartFilters";
import api from "./api";
import { getWeekDay, hours } from "./chartLabels";
interface Props {
  deviceId: string;
}

const DeviceChart: FC<Props> = ({ deviceId }) => {
  const { t } = useTranslation();

  const { Title } = Typography;

  const { filters } = filterStore.useState();

  const [activeTab, setActiveTab] = useState("days");

  const [date, setDate] = useState<DateFilters>({
    startDate: dayjs().startOf("month"),
    endDate: dayjs().endOf("month"),
  });

  const { data: goalAchieve } = useQuery({
    queryKey: [
      queryKeys.getGoalAchieve,
      activeTab,
      filters.goalIds.length,
      date.startDate,
      date.endDate,
    ],
    queryFn: () => {
      return api.getDeviceGoals(filters, activeTab, deviceId, date);
    },
    onError: () => {
      notification.error({
        message: t("deviceCharts.queries.get.error"),
      });
    },
    enabled: Boolean(filters.goalIds.length),
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

  const dataSets = useMemo(() => {
    return formattedData?.map((item) => {
      const timeUnits = Array.from(
        { length: activeTab === "days" ? 7 : 24 },
        (_, i) => (activeTab === "days" ? i + 1 : i)
      );
      const timeUnitsCount = timeUnits.map((timeUnit) => {
        const achieve = item.achieves.find(
          (achieve) =>
            achieve[activeTab === "days" ? "day" : "hour"] === timeUnit
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
  }, [formattedData]);

  const chartComponent = dataSets?.length ? (
    <Line
      style={{ marginBottom: "15px" }}
      data={{
        labels:
          activeTab === "days"
            ? Object.values(getWeekDay(t))
            : Object.values(hours),
        datasets: dataSets || [],
      }}
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

export default DeviceChart;
