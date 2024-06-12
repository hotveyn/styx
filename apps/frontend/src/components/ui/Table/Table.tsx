import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Input,
  Row,
  Table as TableComponent,
  Tooltip,
  Typography,
} from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import { ColumnGroupType, ColumnType, TableProps } from "antd/es/table";
import { SorterResult } from "antd/es/table/interface";
import dayjs from "dayjs";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { formatDateTimeType } from "../../../constants/common";
import routes from "../../../constants/routes";
import { useDebounce } from "../../../hooks/useDebounce";
import filterStore, { resetFilterStore } from "../../../store/FilterStore";
import { DateFilters, IDrawerHandler } from "../../../types/common";
import BackButton from "../BackButton/BackButton";

interface Props<T> {
  dataSource: T[] | undefined;
  columns: (ColumnGroupType<T> | ColumnType<T>)[];
  isLoading: boolean;
  title?: string;
  total: string;
  drawerHandler?: IDrawerHandler<T>;
  width?: string;
  tooltipText?: string;
  hasSearch?: boolean;
  hasDatePicker?: boolean;
  hasBackButton?: boolean;
  canAdd?: boolean;
  rowKey?: string;
  isFilterCleared?: boolean;
  paginationStates?: {
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
  };
}

const Table = <T extends object>({
  dataSource,
  columns,
  isLoading,
  title,
  total,
  drawerHandler,
  width,
  tooltipText,
  hasSearch = true,
  hasDatePicker = true,
  hasBackButton = false,
  canAdd = true,
  rowKey = "id",
  isFilterCleared = true,
  paginationStates,
}: Props<T>) => {
  const { Title } = Typography;

  const [page, setPage] = useState(1);

  const filters = filterStore.useState();

  const { t } = useTranslation();

  const { RangePicker } = DatePicker;

  const handleTableChange: TableProps<T>["onChange"] = (
    pagination,
    _,
    sort
  ) => {
    paginationStates
      ? paginationStates.setCurrentPage(pagination.current!)
      : setPage(pagination.current!);

    filterStore.update((s) => ({
      ...s,
      pagination: {
        limit: s.pagination.limit,
        offset: (pagination.current! - 1) * 10,
      },
    }));

    const sortObj = sort as SorterResult<T>;

    if (sortObj.column) {
      filterStore.update((s) => ({
        ...s,
        sorter: {
          sortField: sortObj.field,
          sortDirection: sortObj.order === "ascend" ? "asc" : "desc",
        },
      }));
    } else {
      filterStore.update((s) => ({
        ...s,
        sorter: {
          sortField: "",
          sortDirection: "",
        },
      }));
    }
  };

  const onShowSizeChangeHandle = (_: number, size: number) => {
    filterStore.update((s) => ({
      ...s,
      pagination: {
        limit: size,
        offset: s.pagination.offset,
      },
    }));
  };

  const pagination = {
    total: +total,
    current: paginationStates?.currentPage || page,
    limit: filters.pagination.limit,
    onShowSizeChange: onShowSizeChangeHandle,
  };

  const [date, setDate] = useState<DateFilters>({
    startDate: null,
    endDate: null,
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

      paginationStates ? paginationStates.setCurrentPage(1) : setPage(1);

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

  const [searchValue, setSearchValue] = useState("");

  const debouncedValue = useDebounce(searchValue, 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (debouncedValue) {
      filterStore.update((s) => ({
        ...s,
        pagination: {
          offset: 0,
          limit: s.pagination.limit,
        },
        filters: {
          ...s.filters,
          searchValue: debouncedValue,
        },
      }));
      paginationStates ? paginationStates.setCurrentPage(1) : setPage(1);
    } else {
      filterStore.update((s) => ({
        ...s,
        filters: {
          ...s.filters,
          searchValue: "",
        },
      }));
    }
  }, [debouncedValue]);

  useEffect(() => {
    isFilterCleared && resetFilterStore();
  }, []);

  const hasAddButton = canAdd && drawerHandler;

  return (
    <>
      {hasBackButton && <BackButton link={`${routes.organizations}`} />}
      <Row justify={"center"} align={"middle"} style={{ marginBottom: "20px" }}>
        <Title style={{ marginBottom: "5px", textAlign: "center" }}>
          {title}
        </Title>
        {hasAddButton && (
          <Tooltip title={tooltipText}>
            <Button
              icon={<PlusOutlined />}
              style={{ width: "50px", height: "35px", marginLeft: "15px" }}
              onClick={() => drawerHandler(true, "add", null)}
            ></Button>
          </Tooltip>
        )}
      </Row>
      <Row gutter={10} align={"middle"} style={{ marginBottom: "20px" }}>
        {hasSearch && (
          <>
            <Col>{t("table.search.label")}: </Col>
            <Col span={6}>
              <Input
                onChange={handleSearch}
                placeholder={t("table.search.placeholder")}
                value={searchValue}
                allowClear
              />
            </Col>
          </>
        )}

        {hasDatePicker && (
          <Col>
            <RangePicker
              value={[date.startDate, date.endDate]}
              format={formatDateTimeType}
              onChange={handlePeriodChange}
              showTime
              disabledDate={(current) => {
                return (
                  dayjs().add(-10, "year") >= current ||
                  dayjs().add(1, "year") <= current
                );
              }}
            />
          </Col>
        )}
      </Row>
      <TableComponent
        dataSource={dataSource}
        columns={columns}
        rowKey={rowKey}
        onChange={handleTableChange}
        pagination={pagination}
        loading={isLoading}
        scroll={{ x: width || 1300 }}
      />
    </>
  );
};

export default Table;
