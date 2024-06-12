import { TFunction } from "i18next";
import { maxContentLengthList } from "../../constants/common";
import { IFormFields } from "../../types/common";

export const getFormItems: (t: TFunction<"translation">) => IFormFields[] = (
  t
) => {
  return [
    {
      columnSpan: 24,
      items: [
        {
          initialValue: "",
          locales: {
            label: "auth.form.fields.login.label",
            placeholder: "auth.form.fields.login.placeholder",
          },
          name: "credential",
          maxContentLength: maxContentLengthList.login,
          rules: [
            {
              required: true,
              message: t("auth.form.fields.login.errorMessage"),
            },
          ],
          inputType: "input",
        },
        {
          initialValue: "",
          locales: {
            label: "auth.form.fields.password.label",
            placeholder: "auth.form.fields.password.placeholder",
          },
          name: "password",
          required: true,
          inputType: "password",
          maxContentLength: maxContentLengthList.password,
          rules: [
            {
              required: true,
              message: t("auth.form.fields.password.errorMessage"),
            },
          ],
        },
      ],
    },
  ];
};
