import { IFormFields } from "../../types/common";

export const getFormItems: () => IFormFields[] = () => {
  return [
    {
      columnSpan: 24,
      items: [
        {
          initialValue: null,
          locales: {
            label: "Устройство",
            placeholder: "Выберите устройство",
          },
          name: "deviceCode",
          inputType: "observerSelect",
          observerSelect: {
            entityType: "devices",
            valueKey: "code",
          },
          rules: [{ required: true, message: "Поле обязательно" }],
        },
        {
          initialValue: null,
          locales: {
            label: "Цель",
            placeholder: "Выберите цель",
          },
          name: "goalCode",
          inputType: "observerSelect",
          observerSelect: {
            entityType: "goals",
            valueKey: "code",
          },
          rules: [{ required: true, message: "Поле обязательно" }],
        },
      ],
    },
  ];
};
