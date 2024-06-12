import { Select, notification } from "antd";
import { AxiosError } from "axios";
import { TFunction } from "i18next";
import { FC, useRef, useState } from "react";
import { useQuery } from "react-query";
import { DadataControllerAddressSuggestError } from "../../../api/data-contracts";
import queryKeys from "../../../constants/queryKeys";
import { useDebounce } from "../../../hooks/useDebounce";
import { IFormItems } from "../../../types/common";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage";
import "./AddressSelect.css";
import api from "./api";

interface Props {
  field: IFormItems;
  t: TFunction<"translation">;
}

const AddressSelect: FC<Props> = ({ field, t, ...props }) => {
  const [searchValue, setSearchValue] = useState(
    field.initialValue ? JSON.parse(field.initialValue as string).address : ""
  );

  const maxLengthCount = 200;

  const debouncedValue = useDebounce(searchValue, 500);

  const isSelecting = useRef(true);

  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.getDadata, debouncedValue],
    queryFn: () => api.getAddress(debouncedValue),
    enabled: Boolean(debouncedValue),
    onError: (error: AxiosError<DadataControllerAddressSuggestError>) => {
      if (error.response?.data.thing) {
        const translatedError = getApiErrorMessage(
          t,
          error.response.data.thing
        );

        notification.error({
          message: translatedError || t("dadata.queries.get.error"),
        });
      }
    },
  });

  const handleSearch = (value: string) => {
    if (value.length > maxLengthCount) return;

    if (value || !isSelecting.current) {
      isSelecting.current = false;
      setSearchValue(value);
    }
  };

  const handleSelect = (value: string) => {
    isSelecting.current = true;
    setSearchValue(JSON.parse(value).address);
  };

  const handleClear = () => {
    setSearchValue("");
  };

  const options = data?.map((address) => ({
    label: address.value,
    value: JSON.stringify({
      address: address.value,
      geo_lat: address.geo_lat,
      geo_lon: address.geo_lon,
    }),
  }));

  if (field === null) return null;

  return (
    <Select
      showSearch
      loading={isLoading}
      searchValue={searchValue}
      options={options}
      onSearch={handleSearch}
      filterOption={() => options as unknown as boolean}
      onSelect={handleSelect}
      onClear={handleClear}
      allowClear
      value={searchValue}
      className="address-select"
      placeholder={
        field.locales.placeholder ? t(field.locales.placeholder) : ""
      }
      {...props}
    />
  );
};

export default AddressSelect;
