import { notification } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { ParameterEntity } from "../../api/data-contracts";
import Table from "../../components/ui/Table/Table";
import { getNavLabels } from "../../constants/common";
import queryKeys from "../../constants/queryKeys";
import useSetPageTitle from "../../hooks/useSetPageTitle";
import filterStore from "../../store/FilterStore";
import { SystemParamDto, SystemParamType } from "../../types/common";
import api from "./api";
import { getParamsColumns } from "./params.columns";

const Params: FC = () => {
  const { t } = useTranslation();

  const filters = filterStore.useState();

  useSetPageTitle(getNavLabels(t).organizations);

  const {
    data,
    isFetching: isParamsLoading,
    refetch,
  } = useQuery({
    queryKey: [queryKeys.getOrganizations, filters],
    queryFn: () => api.getParams(filters),
    onError: () => {
      notification.error({
        message: t("params.queries.get.error"),
      });
    },
    keepPreviousData: true,
  });

  const getMutationFn = (paramKey: SystemParamType, value: SystemParamDto) => {
    switch (paramKey) {
      case "ACCESS_TOKEN_LIFE_TIME":
        return api.editAccessTokenLifeTime({ value: Number(value) });
      case "DEVICE_DETECT_INTERVAL":
        return api.editDeviceDetectTime({ value: Number(value) });
      case "REFRESH_TOKEN_LIFE_TIME":
        return api.editRefreshTokenLifeTime({ value: Number(value) });
      case "SPEECH_CREDENTIALS":
        return api.editSpeechCredentials({ value: String(value) });
      case "DADATA_CREDENTIALS":
        return api.editDadataCredentials({ value: String(value) });
      case "TELEGRAM_BOT_NAME":
        return api.editTelegramBotName({ value: String(value) });
      case "TELEGRAM_BOT_TOKEN":
        return api.editTelegramBotToken({ value: String(value) });
    }
  };

  const { mutate: editMutate, isLoading: isEditLoading } = useMutation({
    mutationKey: [queryKeys.editParam],
    mutationFn: (payload: {
      paramCode: SystemParamType;
      value: SystemParamDto;
    }) => getMutationFn(payload.paramCode, payload.value),
    onSuccess: () => {
      refetch();
      notification.success({
        message: t("params.queries.patch.success"),
      });
    },
    onError: () => {
      notification.error({
        message: t("params.queries.patch.error"),
      });
    },
  });

  const handleEditParam = (row: ParameterEntity, value: SystemParamDto) => {
    editMutate({ paramCode: row.code as SystemParamType, value });
  };

  return (
    <>
      <Table<ParameterEntity>
        columns={getParamsColumns(t, handleEditParam, isEditLoading)}
        dataSource={data?.data}
        isLoading={isParamsLoading}
        title={getNavLabels(t).params}
        total={data?.count as string}
        hasDatePicker={false}
        hasSearch={false}
        width="1000px"
        rowKey="code"
      />
    </>
  );
};

export default Params;
