import { CaretLeftOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Row,
  Tooltip,
  notification,
} from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import {
  GoalAchieveGroupEntity,
  GoalAchieveGroupEntityWithPagination,
  GoalAchieveQueryEntity,
  GoalAchieveQueryEntityWithPagination,
} from "../../api/data-contracts";
import Table from "../../components/ui/Table/Table";
import { formatDateTimeType, getNavLabels } from "../../constants/common";
import queryKeys from "../../constants/queryKeys";
import useSetPageTitle from "../../hooks/useSetPageTitle";
import filterStore from "../../store/FilterStore";
import { DateFilters } from "../../types/common";
import goalApi from "../Goals/api";
import { getAchievedGoalColumns } from "./achievedGoals.columns";

const AchievedGoals: FC = () => {
  const { t } = useTranslation();

  useSetPageTitle(getNavLabels(t).achievedGoals);

  const [isCodeShow, setIsCodeShow] = useState(false);

  const [page, setPage] = useState(1);

  const filters = filterStore.useState();

  const { RangePicker } = DatePicker;

  const isFilteredGoals = Boolean(
    filters.filters.goalIds.length && filters.filters.deviceId
  );

  const queryFn = isFilteredGoals
    ? () => goalApi.getAchievedGoals(filters)
    : () => goalApi.getGroupGoals(filters);

  const { data: goals, isFetching: isGoalsLoading } = useQuery<
    GoalAchieveQueryEntityWithPagination | GoalAchieveGroupEntityWithPagination
  >({
    queryFn,
    queryKey: [queryKeys.getAchievedGoals, filters],
    onError: () => {
      notification.error({
        message: t("goals.queries.get.error"),
      });
    },
    keepPreviousData: true,
    enabled: Boolean(filters.period.startDate),
  });

  const [date, setDate] = useState<DateFilters>({
    startDate: dayjs().startOf("month"),
    endDate: dayjs().endOf("month"),
  });

  const handlePeriodChange: RangePickerProps["onChange"] = (values) => {
    setDate({
      startDate: values ? dayjs(values[0]) : null,
      endDate: values ? dayjs(values[1]) : null,
    });

    if (values?.[0] || values?.[1]) {
      filterStore.update((s) => ({
        ...s,
        pagination: {
          limit: s.pagination.limit,
          offset: 0,
        },
        period: {
          startDate: values[0]?.format(),
          endDate: values[1]?.format(),
        },
      }));

      return;
    }

    filterStore.update((s) => ({
      ...s,
      period: {
        startDate: "",
        endDate: "",
      },
    }));
  };

  useEffect(() => {
    filterStore.update((s) => ({
      ...s,
      pagination: {
        limit: s.pagination.limit,
        offset: 0,
      },
      period: {
        startDate: date.startDate!.format(),
        endDate: date.endDate!.format(),
      },
    }));
  }, [isFilteredGoals]);

  const handleResetPage = () => {
    setPage(1);
    filterStore.update((s) => ({
      ...s,
      pagination: {
        limit: s.pagination.limit,
        offset: 0,
      },
    }));
  };

  const handleChangePage = (deviceId?: string, goalId?: string) => {
    handleResetPage();

    filterStore.update((s) => ({
      ...s,
      filters: {
        ...s,
        deviceId: deviceId || "",
        goalIds: goalId ? [goalId] : [],
      },
    }));
  };

  return (
    <>
      {isFilteredGoals && (
        <Tooltip title={t("buttons.back")}>
          <Button
            icon={<CaretLeftOutlined />}
            style={{ marginBottom: "10px" }}
            onClick={() => handleChangePage()}
          ></Button>
        </Tooltip>
      )}
      <Row
        align={"middle"}
        justify={"space-between"}
        style={{ marginBottom: "15px" }}
      >
        <Col>
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
        </Col>
        <Col>
          <Checkbox
            checked={isCodeShow}
            onClick={() => setIsCodeShow(!isCodeShow)}
          >
            {t("goalsStatistics.showCode")}
          </Checkbox>
        </Col>
      </Row>

      <Table<GoalAchieveGroupEntity | GoalAchieveQueryEntity>
        columns={getAchievedGoalColumns(
          t,
          isFilteredGoals,
          handleChangePage,
          isCodeShow
        )}
        dataSource={goals?.data}
        isLoading={isGoalsLoading}
        title={getNavLabels(t).achievedGoals}
        total={goals?.count as string}
        hasSearch={false}
        hasDatePicker={false}
        paginationStates={{
          currentPage: page,
          setCurrentPage: setPage,
        }}
      />
    </>
  );
};

export default AchievedGoals;
