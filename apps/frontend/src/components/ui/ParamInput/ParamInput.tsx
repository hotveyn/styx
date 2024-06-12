import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Col, Input, Popconfirm, Row, Select, Tooltip } from "antd";
import { ChangeEvent, FC, KeyboardEventHandler, useState } from "react";
import { useTranslation } from "react-i18next";
import { ParameterEntity } from "../../../api/data-contracts";
import { SystemParamDto } from "../../../types/common";

interface Props {
  value: string;
  row: ParameterEntity;
  handleEditParam: (data: ParameterEntity, value: SystemParamDto) => void;
  isEditLoading: boolean;
}

const ParamInput: FC<Props> = ({
  handleEditParam,
  row,
  value,
  isEditLoading,
}) => {
  const { t } = useTranslation();

  const [isDisabled, setIsDisabled] = useState(true);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value <= 0) {
      setIsDisabled(true);
      return;
    }

    if (isNaN(+value) && !isNaN(+e.target.value)) {
      setIsDisabled(true);
      return;
    }

    row.value = e.target.value;
    setIsDisabled(value === row.value);
  };

  const handleSelect = (value: string) => {
    row.value = value;
    setIsDisabled(value !== row.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if ((e.key === "." || e.key === ",") && !isNaN(+e.currentTarget.value)) {
      e.preventDefault();
    }
  };

  const getInput = () => {
    if (row.code === "FAILURE_DETECT_TYPE") {
      return (
        <Select
          options={[
            { label: "ping", value: "ping" },
            { label: "socket", value: "socket" },
          ]}
          defaultValue={value}
          style={{ width: "100%" }}
          onSelect={handleSelect}
        />
      );
    }
    return (
      <Input
        defaultValue={value}
        onChange={handleInputChange}
        type={isNaN(+value) ? "text" : "number"}
        maxLength={200}
        showCount
        onKeyDown={handleKeyDown}
      />
    );
  };

  return (
    <Row gutter={[20, 0]}>
      <Col span={18}>{getInput()}</Col>
      <Col span={4}>
        <Tooltip title={t("confirms.params.apply")}>
          <Popconfirm
            title={`${t("confirms.params.edit")}`}
            onConfirm={() => {
              if (!row.value) return;
              handleEditParam(row, row.value as unknown as SystemParamDto);
              setIsDisabled(true);
            }}
            okText={t("words.yes")}
            cancelText={t("words.no")}
            placement="left"
          >
            <Button
              icon={<CheckCircleOutlined />}
              loading={isEditLoading}
              disabled={isDisabled}
            />
          </Popconfirm>
        </Tooltip>
      </Col>
    </Row>
  );
};

export default ParamInput;
