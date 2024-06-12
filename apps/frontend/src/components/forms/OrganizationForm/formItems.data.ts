import { TFunction } from "i18next";
import { OrganizationEntity } from "../../../api/data-contracts";
import { maxContentLengthList } from "../../../constants/common";
import { IFormFields } from "../../../types/common";

export const getFormItems: (
  organization: OrganizationEntity | null,
  t: TFunction<"translation">
) => IFormFields[] = (organization, t) => {
  return [
    {
      columnSpan: 24,
      items: [
        {
          initialValue: organization?.name || "",
          locales: {
            label: "organizations.drawer.fields.name.label",
            placeholder: "organizations.drawer.fields.name.placeholder",
          },
          name: "name",
          maxContentLength: maxContentLengthList.name,
          rules: [
            {
              required: true,
              message: t("organizations.drawer.fields.name.errorMessage"),
            },
          ],
          inputType: "input",
        },
      ],
    },
  ];
};
