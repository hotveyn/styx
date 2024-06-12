import { TFunction } from "i18next";
import { GoalEntity } from "../../../api/data-contracts";
import { maxContentLengthList } from "../../../constants/common";
import userProfileStore from "../../../store/UserProfileStore";
import { IFormFields } from "../../../types/common";
import CopyButton from "../../ui/CopyButton/CopyButton";

export const getFormItems: (
  goal: GoalEntity | null,
  t: TFunction<"translation">
) => IFormFields<GoalEntity>[] = (goal, t) => {
  const isOrganizationChangeable = Boolean(
    userProfileStore.getRawState().organizationId || goal
  );

  return [
    {
      columnSpan: 24,
      items: [
        {
          initialValue: goal?.name || "",
          locales: {
            label: "goals.drawer.fields.name.label",
            placeholder: "goals.drawer.fields.name.placeholder",
          },
          name: "name",
          inputType: "input",
          maxContentLength: maxContentLengthList.name,
          rules: [
            {
              message: t("goals.drawer.fields.name.errorMessage"),
              required: true,
            },
          ],
        },
        {
          initialValue: goal?.description || "",
          maxContentLength: maxContentLengthList.description,
          locales: {
            label: "goals.drawer.fields.description.label",
            placeholder: "goals.drawer.fields.description.placeholder",
          },
          name: "description",
          rules: [
            {
              required: true,
              message: t("goals.drawer.fields.description.errorMessage"),
            },
          ],
          inputType: "input",
        },
        {
          initialValue: goal?.code || "",
          locales: {
            label: "goals.drawer.fields.code.label",
            placeholder: "goals.drawer.fields.code.placeholder",
          },
          name: "code",
          rules: [
            { required: goal ? true : false },
            {
              pattern: /^[a-zA-Z\s\d!@#$%^&*()_+{}[\]:;<>,.?~\\/`'"\-|=]+$/,
              message: t("goals.drawer.fields.code.errorMessage"),
            },
          ],
          inputType: "input",
          extraField: goal ? (
            <CopyButton
              copyText={goal.code}
              entityKey="goal"
              entityName={goal.name}
            />
          ) : (
            <></>
          ),
        },
        isOrganizationChangeable
          ? null
          : {
              initialValue: goal?.organizationId || null,
              locales: {
                label: "goals.drawer.fields.organization.label",
                placeholder: "goals.drawer.fields.organization.placeholder",
              },
              name: "organizationId",
              rules: [
                {
                  message: t("goals.drawer.fields.organization.errorMessage"),
                  required: true,
                },
              ],
              inputType: "observerSelect",
              observerSelect: {
                entityType: "organizations",
                formVisibleEntity: goal,
              },
            },
      ],
    },
  ];
};
