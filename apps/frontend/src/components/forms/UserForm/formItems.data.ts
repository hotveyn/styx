import { TFunction } from "i18next";
import { Content } from "vanilla-jsoneditor";
import { UserEntity } from "../../../api/data-contracts";
import { maxContentLengthList, regExpList } from "../../../constants/common";
import userProfileStore from "../../../store/UserProfileStore";
import { DrawerState, IFormFields } from "../../../types/common";

export const getFormItems: (
  user: UserEntity | null,
  drawerState: DrawerState,
  JSONvalue: Content,
  handler: (content: Content) => void,
  t: TFunction<"translation">
) => IFormFields<UserEntity>[] = (user, drawerState, JSONvalue, handler, t) => {
  return [
    {
      columnSpan: 24,
      items: [
        userProfileStore.getRawState().organizationId
          ? null
          : {
              initialValue: user?.organizationId || null,
              locales: {
                label: "users.drawer.fields.organization.label",
                placeholder: "users.drawer.fields.organization.placeholder",
              },
              observerSelect: {
                entityType: "organizations",
                formVisibleEntity: user,
              },
              name: "organizationId",
              inputType: "observerSelect",
              rules: [],
            },
        {
          initialValue: user?.name || "",
          locales: {
            label: "users.drawer.fields.name.label",
            placeholder: "users.drawer.fields.name.placeholder",
          },
          name: "name",
          inputType: "input",
          maxContentLength: maxContentLengthList.fullname,
          rules: [
            {
              required: true,
              message: t("users.drawer.fields.name.errorMessage"),
            },
          ],
        },
        {
          initialValue: user?.login || "",
          locales: {
            label: "users.drawer.fields.login.label",
            placeholder: "users.drawer.fields.login.placeholder",
          },
          name: "login",
          inputType: "input",
          maxContentLength: maxContentLengthList.login,
          rules: [
            {
              message: t("users.drawer.fields.login.errorMessage"),
              required: true,
            },
          ],
        },
        {
          initialValue: user?.email || "",
          locales: {
            label: "users.drawer.fields.email.label",
            placeholder: "users.drawer.fields.email.placeholder",
          },
          name: "email",
          maxContentLength: maxContentLengthList.email,
          rules: [
            {
              message: t("users.drawer.fields.email.errorMessage"),
              required: true,
            },
            {
              pattern: regExpList.email,
              message: t("users.drawer.fields.email.pattern"),
            },
          ],
          inputType: "input",
        },
        {
          initialValue: "",
          locales: {
            label: "users.drawer.fields.password.label",
            placeholder: "users.drawer.fields.password.placeholder",
          },
          name: "password",
          maxContentLength: maxContentLengthList.password,
          inputType: "password",
          rules: [
            {
              message: t("users.drawer.fields.password.errorMessage"),
              required: drawerState === "add",
            },
            {
              message: t("users.drawer.fields.password.pattern"),
              pattern: regExpList.nospace,
            },
          ],
        },
        {
          initialValue: user?.additionalData || "",
          locales: {
            label: "users.drawer.fields.additionalData.label",
          },
          name: "additionalData",
          rules: [{ required: false }],
          json: {
            content: JSONvalue,
            handler,
          },
          inputType: "json",
          span: 24,
        },
      ],
    },
  ];
};
