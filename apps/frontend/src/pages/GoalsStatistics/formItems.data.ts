import { TFunction } from "i18next";
import { IFormFields } from "../../types/common";

export const getFormItems: (
  t: TFunction<"translation">,
  initialSelectValues: string[]
) => IFormFields[] = (t, initialSelectValues) => {
  return [
    {
      columnSpan: 24,
      items: [
        {
          initialValue: initialSelectValues,
          locales: {
            label: t("goalsStatistics.goalFilter.label"),
            placeholder: t("goalsStatistics.goalFilter.placeholder"),
          },
          name: "goalIds",
          rules: [],
          select: {
            mode: "multiple",
            allowClear: false,
          },
          observerSelect: {
            entityType: "goals",
          },
          inputType: "observerSelect",
        },
      ],
    },
  ];
};
