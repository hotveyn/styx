import { TFunction } from "i18next";
import { ApplicationEntity } from "../../../api/data-contracts";
import { maxContentLengthList } from "../../../constants/common";
import { IFormFields } from "../../../types/common";

export const getFormItems: (
  application: ApplicationEntity | null,
  t: TFunction<"translation">
) => IFormFields[] = (application, t) => {
  return [
    {
      columnSpan: 24,
      items: [
        {
          initialValue: application?.name || "",
          locales: {
            label: "applications.drawer.fields.name.label",
            placeholder: "applications.drawer.fields.name.placeholder",
          },
          name: "name",
          inputType: "input",
          maxContentLength: maxContentLengthList.name,
          rules: [
            {
              required: true,
              message: t("applications.drawer.fields.name.errorMessage"),
            },
            {
              pattern: /^[A-Za-z0-9]+$/,
              message: t("applications.drawer.fields.name.pattern"),
            },
          ],
        },
      ],
    },
  ];
};
