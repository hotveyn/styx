import { TFunction } from "i18next";
import { CameraEntity } from "../../../api/data-contracts";
import {
  defaultMaxContentLength,
  maxContentLengthList,
  regExpList,
} from "../../../constants/common";
import userProfileStore from "../../../store/UserProfileStore";
import { IFormFields } from "../../../types/common";

export const getFormItems: (
  camera: CameraEntity | null,
  t: TFunction<"translation">
) => IFormFields[] = (camera, t) => {
  const isOrganizationChangeable = Boolean(
    userProfileStore.getRawState().organizationId || camera
  );

  return [
    {
      columnSpan: 24,
      items: [
        {
          initialValue: camera?.name || "",
          locales: {
            label: "cameras.drawer.fields.name.label",
            placeholder: "cameras.drawer.fields.name.placeholder",
          },
          name: "name",
          maxContentLength: maxContentLengthList.name,
          rules: [
            {
              required: true,
              message: t("cameras.drawer.fields.name.errorMessage"),
            },
          ],
          inputType: "input",
        },
        {
          initialValue: camera?.link || "",
          locales: {
            label: "cameras.drawer.fields.link.label",
            placeholder: "cameras.drawer.fields.link.placeholder",
          },
          name: "link",
          maxContentLength: defaultMaxContentLength,
          rules: [
            {
              required: true,
              message: t("cameras.drawer.fields.link.errorMessage"),
            },
            {
              pattern: regExpList.url,
              message: t("cameras.drawer.fields.link.validLink"),
            },
          ],
          inputType: "input",
        },
        isOrganizationChangeable
          ? null
          : {
              initialValue: camera?.organizationId || null,
              locales: {
                label: "cameras.drawer.fields.organization.label",
                placeholder: "cameras.drawer.fields.organization.placeholder",
              },
              name: "organizationId",
              observerSelect: {
                entityType: "organizations",
                formVisibleEntity: camera,
              },
              inputType: "observerSelect",
              rules: [
                {
                  required: camera ? false : true,
                  message: t("cameras.drawer.fields.organization.errorMessage"),
                },
              ],
            },
      ],
    },
  ];
};
