import { Button, Col, DatePicker, Form, Row, notification } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { formatDateTimeType } from "../../../constants/common";
import queryKeys from "../../../constants/queryKeys";
import goalsApi from "../../../pages/Goals/api";
import { getFormItems } from "../../../pages/GoalsStatistics/formItems.data";
import filterStore, { resetFilterStore } from "../../../store/FilterStore";
import { DateFilters } from "../../../types/common";
import { renderFormItems } from "../../../utils/renderFormItems";

interface Props {
  date: DateFilters;
  setDate: Dispatch<SetStateAction<DateFilters>>;
}

const ChartFilters: FC<Props> = ({ date, setDate }) => {
  const { t } = useTranslation();

  const { RangePicker } = DatePicker;

  const filters = filterStore.useState();

  const [isResetButtonShown, setIsResetButtonShown] = useState(false);

  const [form] = Form.useForm();

  const { data: goals, isLoading: isGoalsLoading } = useQuery({
    queryKey: [queryKeys.getGoals],
    queryFn: () => goalsApi.getGoals(filters),
    onError: () => {
      notification.error({
        message: t("goals.queries.get.error"),
      });
    },
    cacheTime: 0,
    staleTime: 0,
  });

  useEffect(() => {
    resetFilterStore();
  }, []);

  useEffect(() => {
    if (!isGoalsLoading && !filters.filters.goalIds.length && goals?.data.length) {
      filterStore.update((s) => ({
        ...s,
        filters: {
          ...s.filters,
          goalIds: [goals?.data[0]?.id],
        },
      }));
    }
  }, [isGoalsLoading, filters.filters.goalIds.length]);

  const handleSubmit = ({ goalIds }: { goalIds: string[] }) => {
    filterStore.update((s) => ({
      ...s,
      filters: {
        ...s.filters,
        goalIds: goalIds,
      },
    }));

    setIsResetButtonShown(goalIds.length > 1);
  };

  const handleReset = () => {
    filterStore.update((s) => ({
      ...s,
      filters: {
        ...s.filters,
        goalIds: [goals?.data[0]?.id],
      },
    }));

    form.setFieldValue("goalIds", [goals?.data[0]?.id]);

    setIsResetButtonShown(false);
  };

  const handlePeriodChange: RangePickerProps["onChange"] = (values) => {
    setDate({
      startDate: values ? dayjs(values[0]) : null,
      endDate: values ? dayjs(values[1]) : null,
    });

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

  return filters.filters.goalIds.length ? (
    <>
      <Form onFinish={handleSubmit} form={form}>
        <Row align={"middle"}>
          <Col span={12} style={{ marginRight: "20px" }}>
            {renderFormItems(getFormItems(t, filters.filters.goalIds), t)}
          </Col>
          <Col style={{ marginTop: "15px", marginRight: "20px" }}>
            <Button htmlType="submit">
              {t("goalsStatistics.goalFilter.applyButton")}
            </Button>
          </Col>
          {isResetButtonShown && (
            <Col style={{ marginTop: "15px" }}>
              <Button onClick={handleReset}>
                {t("goalsStatistics.goalFilter.resetButton")}
              </Button>
            </Col>
          )}
        </Row>
      </Form>

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
        style={{ marginTop: "15px" }}
      />
    </>
  ) : (
    <></>
  );
};

export default ChartFilters;
