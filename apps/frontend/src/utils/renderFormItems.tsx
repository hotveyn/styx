import { Col, Form, Input, Row, Select } from "antd";
import { TFunction } from "i18next";
import { Mode } from "vanilla-jsoneditor";
import AddressSelect from "../components/ui/AddressSelect/AddressSelect";
import JSONEditor from "../components/ui/JSONEditor/JSONEditor";
import ObserverSelect from "../components/ui/Select/ObserverSelect";
import { defaultMaxContentLength, regExpList } from "../constants/common";
import {
  IFormFields,
  IFormItems,
  InputType,
  VisibleFormEntity,
} from "../types/common";

const getInputType = <T extends VisibleFormEntity>(
  inputType: InputType,
  field: IFormItems<T>,
  t: TFunction<"translation">
) => {
  if (field === null) return;

  switch (inputType) {
    case "input":
      return (
        <Input
          placeholder={
            field.locales.placeholder ? t(field.locales.placeholder) : ""
          }
          maxLength={field.maxContentLength || defaultMaxContentLength}
          showCount
        />
      );

    case "select":
      return (
        <Select
          showSearch
          searchValue={field.select?.searchValue}
          options={field.select?.options || []}
          onSearch={field.select?.onSearch}
          allowClear
          placeholder={
            field.locales.placeholder ? t(field.locales.placeholder) : ""
          }
          filterOption={() => field.select?.options as unknown as boolean}
          value={field.select?.searchValue}
        />
      );

    case "observerSelect":
      return (
        <ObserverSelect
          field={field}
          t={t}
          mode={field.select?.mode}
          allowClear={field.select?.allowClear}
          entityType={field.observerSelect?.entityType || "organizations"}
          formVisibleEntity={field.observerSelect?.formVisibleEntity}
          valueKey={field.observerSelect?.valueKey}
        />
      );

    case "json":
      return (
        <>
          <JSONEditor
            mode={Mode.text}
            mainMenuBar={false}
            content={field.json?.content}
            onChange={field.json?.handler}
          />
        </>
      );

    case "password":
      return (
        <Input.Password
          placeholder={
            field.locales.placeholder ? t(field.locales.placeholder) : ""
          }
          maxLength={field.maxContentLength || defaultMaxContentLength}
          showCount
        />
      );

    case "address":
      return <AddressSelect field={field} t={t} />;
  }
};

export const renderFormItems = <T,>(
  fields: IFormFields<T>[],
  t: TFunction<"translation">
) => {
  return fields.map((column, index) => {
    return (
      <Row key={index} gutter={[20, 0]}>
        {column.items.map((field) => {
          if (field === null) return null;

          const rules = [
            ...field.rules,
            { pattern: regExpList.whitespace, message: t("noSpaceMessage") },
          ];

          return (
            <Col span={field.span || column.columnSpan} key={field.name}>
              <Row>
                <Col span={24}>
                  <Form.Item
                    label={
                      <Row align={"middle"}>
                        <Col>{t(field.locales.label)}</Col>
                        <Col style={{ marginLeft: "10px" }}>
                          {field.extraField}
                        </Col>
                      </Row>
                    }
                    name={field.name}
                    rules={rules}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    initialValue={field.initialValue}
                  >
                    {getInputType(
                      field.inputType,
                      field as unknown as IFormItems<VisibleFormEntity>,
                      t
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          );
        })}
      </Row>
    );
  });
};
