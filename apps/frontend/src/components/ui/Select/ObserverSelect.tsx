/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Select, notification } from "antd";
import { TFunction } from "i18next";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import queryKeys from "../../../constants/queryKeys";
import { useDebounce } from "../../../hooks/useDebounce";
import devicesApi from "../../../pages/Devices/api";
import goalsApi from "../../../pages/Goals/api";
import organizationsApi from "../../../pages/Organizations/api";
import {
  IFormItems,
  ObserverSelectEntityType,
  VisibleFormEntity,
} from "../../../types/common";
import Loader from "../Loader/Loader";
interface Props<T> {
  field: IFormItems<T>;
  t: TFunction<"translation">;
  entityType: ObserverSelectEntityType;
  formVisibleEntity?: VisibleFormEntity | null;
  mode?: "tags" | "multiple";
  allowClear?: boolean;
  valueKey?: keyof VisibleFormEntity;
}

const ObserverSelect: FC<Props<VisibleFormEntity>> = ({
  field,
  t,
  entityType,
  formVisibleEntity = null,
  mode,
  allowClear = true,
  valueKey = "id",
  ...props
}) => {
  // getting functions for api
  const getEntityFunctions = () => {
    switch (entityType) {
      case "organizations":
        return {
          getOne: {
            queryFunction: organizationsApi.getOrganizationById,
            queryKey: queryKeys.getOrganization,
          },
          getAll: {
            queryFunction: organizationsApi.getOrganizations,
            queryKey: queryKeys.getOrganizations,
          },
        };
      case "goals":
        return {
          getAll: {
            queryFunction: goalsApi.getGoals,
            queryKey: queryKeys.getGoals,
          },
        };
      case "devices":
        return {
          getAll: {
            queryFunction: devicesApi.getDevices,
            queryKey: queryKeys.getDevices,
          },
        };
    }
  };

  const limit = 30;

  const [offset, setOffset] = useState(0);
  const [options, setOptions] = useState<
    | {
        label: string;
        value:
          | string
          | {
              name: string;
            }
          | null;
      }[]
    | []
  >([]);

  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);

  const params = new URLSearchParams();

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  // getting entitites
  //@ts-ignore
  const { data, isFetching } = useQuery({
    queryKey: [getEntityFunctions().getAll.queryKey, debouncedValue || offset],
    queryFn: () =>
      getEntityFunctions().getAll.queryFunction(
        undefined,
        debouncedValue ? 0 : offset,
        limit,
        debouncedValue
      ),
    onError: () => {
      notification.error({
        message: t(`${entityType}.queries.get.error`),
      });
    },
  });

  const count = data?.data.length;

  const observer = useRef<IntersectionObserver>();

  const sentinel = useCallback(
    async (node: HTMLDivElement) => {
      if (isFetching) return;
      if (count && limit) {
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && +count >= limit) {
            setOffset && setOffset((offset) => offset + limit);
            observer.current?.disconnect();
          }
        });
        if (node) observer.current.observe(node);
      }
    },
    [isFetching, options]
  );

  // if initial value (id) is set in select
  const getIsFormEntityVisible = () => {
    if (formVisibleEntity?.organizationId) {
      return (
        data?.data.some(
          (entity) => entity.id === formVisibleEntity?.organizationId
        ) || true
      );
    }

    return false;
  };

  const isFormEntityVisible = getIsFormEntityVisible();

  const { data: notVisibleEntity } = useQuery({
    queryKey: [getEntityFunctions().getOne?.queryKey],
    queryFn: () =>
      getEntityFunctions().getOne?.queryFunction(
        formVisibleEntity?.organizationId as string
      ),
    enabled: isFormEntityVisible,
  });

  useEffect(() => {
    params.set("page", "1");
    if (debouncedValue) {
      setOffset(0);
      params.set("name", debouncedValue);
    } else {
      params.delete("name");
    }
  }, [debouncedValue]);

  // handling options state
  useEffect(() => {
    const isEntityLoaded =
      (data?.data && !isFetching) ||
      (notVisibleEntity && formVisibleEntity && data?.data && !isFetching);

    if (isEntityLoaded) {
      setOptions(
        offset
          ? (prev) => [
              ...prev,
              ...data.data.map((entity) => ({
                label: entity.name,
                //@ts-ignore
                value: entity[valueKey],
              })),
            ]
          : () =>
              isFormEntityVisible
                ? [
                    ...data.data.map((entity) => ({
                      label: entity.name,
                      //@ts-ignore
                      value: entity[valueKey],
                    })),
                    {
                      label: notVisibleEntity?.data[0].name || "",
                      //@ts-ignore
                      value: notVisibleEntity?.data[0][valueKey] || "",
                    },
                  ]
                : [
                    ...data.data.map((organization) => ({
                      label: organization.name,
                      //@ts-ignore
                      value: organization[valueKey],
                    })),
                  ]
      );
    }
  }, [isFetching]);

  if (field === null) return;

  return (
    <Select
      showSearch
      searchValue={searchValue}
      options={options}
      onSearch={handleSearch}
      allowClear={allowClear}
      placeholder={
        field.locales.placeholder ? t(field.locales.placeholder) : ""
      }
      mode={mode}
      filterOption={() => options as unknown as boolean}
      optionRender={(option, { index }) => {
        if ((options.length as number) - 1 === index) {
          return (
            <>
              {option.label}
              {isFetching && <Loader />}
              <div ref={sentinel}></div>
            </>
          );
        }

        return <>{option.label}</>;
      }}
      {...props}
    />
  );
};

export default ObserverSelect;
