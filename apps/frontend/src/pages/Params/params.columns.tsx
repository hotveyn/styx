import { CloseOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { TFunction } from "i18next";
import { ParameterEntity } from "../../api/data-contracts";
import ParamInput from "../../components/ui/ParamInput/ParamInput";
import paramTranslationKeys from "../../constants/paramTranslationKeys";
import { SystemParamDto } from "../../types/common";

export const getParamsColumns = (
  t: TFunction<"translation">,
  handleEditParam: (data: ParameterEntity, value: SystemParamDto) => void,
  isEditLoading: boolean
): ColumnsType<ParameterEntity> => {
  return [
    {
      title: t("params.columns.code"),
      dataIndex: "code",
      align: "center",
    },
    {
      title: t("params.columns.name"),
      dataIndex: "name",
      align: "center",
      render: (_, row) =>
        t(
          paramTranslationKeys[row.code as keyof typeof paramTranslationKeys]
            ?.name
        ),
    },
    {
      title: t("params.columns.description"),
      dataIndex: "description",
      render: (value, row) =>
        value ? (
          t(
            paramTranslationKeys[row.code as keyof typeof paramTranslationKeys]
              ?.description
          )
        ) : (
          <CloseOutlined />
        ),
      align: "center",
    },
    {
      title: t("params.columns.value"),
      dataIndex: "value",
      render: (value, row) =>
        value ? (
          <ParamInput
            handleEditParam={handleEditParam}
            isEditLoading={isEditLoading}
            row={row}
            value={value}
          />
        ) : (
          <></>
        ),
    },
  ];
};
