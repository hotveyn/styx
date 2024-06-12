import { TFunction } from "i18next";
import { Content } from "vanilla-jsoneditor";
import { DeviceEntity } from "../../../api/data-contracts";
import { maxContentLengthList, regExpList } from "../../../constants/common";
import userProfileStore from "../../../store/UserProfileStore";
import { DrawerState, IFormFields } from "../../../types/common";
import CopyButton from "../../ui/CopyButton/CopyButton";
import { getStatuses } from "./deviceStatuses.data";

export const getFormItems: (
  device: DeviceEntity | null,
  drawerState: DrawerState,
  JSONvalue: Content,
  handler: (content: Content) => void,
  t: TFunction<"translation">
) => IFormFields<DeviceEntity>[] = (
  device,
  drawerState,
  JSONvalue,
  handler,
  t
) => {
  const isOrganizationChangeable = Boolean(
    userProfileStore.getRawState().organizationId || device
  );

  return [
    {
      columnSpan: 12,
      items: [
        {
          initialValue: device?.ip || "",
          locales: {
            label: "devices.drawer.fields.ip.label",
            placeholder: "devices.drawer.fields.ip.placeholder",
          },
          name: "ip",
          inputType: "input",
          maxContentLength: maxContentLengthList.ip,
          rules: [
            {
              required: true,
              message: t("devices.drawer.fields.ip.errorMessage"),
            },
            {
              pattern: regExpList.ip,
              message: t("devices.drawer.fields.ip.pattern"),
            },
          ],
        },
        {
          initialValue: device?.port || "",
          locales: {
            label: "devices.drawer.fields.port.label",
            placeholder: "devices.drawer.fields.port.placeholder",
          },
          name: "port",
          maxContentLength: maxContentLengthList.port,
          inputType: "input",
          rules: [
            {
              message: t("devices.drawer.fields.port.errorMessage"),
              required: true,
            },
            {
              pattern: regExpList.port,
              message: t("devices.drawer.fields.port.pattern"),
            },
          ],
        },
        {
          initialValue: device?.name || "",
          locales: {
            label: "devices.drawer.fields.name.label",
            placeholder: "devices.drawer.fields.name.placeholder",
          },
          maxContentLength: maxContentLengthList.name,
          name: "name",
          inputType: "input",
          rules: [
            {
              message: t("devices.drawer.fields.name.errorMessage"),
              required: true,
            },
          ],
        },
        {
          initialValue: device?.deviceType || "",
          maxContentLength: maxContentLengthList.soft,
          locales: {
            label: "devices.drawer.fields.deviceType.label",
            placeholder: "devices.drawer.fields.deviceType.placeholder",
          },
          name: "deviceType",
          inputType: "input",
          rules: [
            {
              required: drawerState === "add",
              message: t("devices.drawer.fields.deviceType.errorMessage"),
            },
          ],
        },
        {
          initialValue: device?.address
            ? JSON.stringify({
                address: device?.address,
                geo_lat: device?.geo.split(" ")[0],
                geo_lon: device?.geo.split(" ")[1],
              })
            : null,
          maxContentLength: maxContentLengthList.address,
          locales: {
            label: "devices.drawer.fields.address.label",
            placeholder: "devices.drawer.fields.address.placeholder",
          },
          name: "address",
          rules: [
            {
              required: true,
              message: t("devices.drawer.fields.address.errorMessage"),
            },
          ],
          inputType: "address",
          span: 24,
        },
      ],
    },
    {
      columnSpan: 12,
      items: [
        {
          initialValue: device?.softwareType || "",
          maxContentLength: maxContentLengthList.soft,
          locales: {
            label: "devices.drawer.fields.softwareType.label",
            placeholder: "devices.drawer.fields.softwareType.placeholder",
          },
          name: "softwareType",
          rules: [{ required: false }],
          inputType: "input",
        },
        {
          initialValue: device?.softwareVersion || "",
          maxContentLength: maxContentLengthList.soft,
          locales: {
            label: "devices.drawer.fields.softwareVersion.label",
            placeholder: "devices.drawer.fields.softwareVersion.placeholder",
          },
          name: "softwareVersion",
          rules: [{ required: false }],
          inputType: "input",
        },
        isOrganizationChangeable
          ? null
          : {
              initialValue: null,
              locales: {
                label: "devices.drawer.fields.organization.label",
                placeholder: "devices.drawer.fields.organization.placeholder",
              },
              name: "organizationId",
              rules: [{ required: true }],
              inputType: "observerSelect",
              observerSelect: {
                entityType: "organizations",
                formVisibleEntity: device,
              },
            },
        {
          initialValue: device?.status || null,
          locales: {
            label: "devices.drawer.fields.status.label",
            placeholder: "devices.drawer.fields.status.placeholder",
          },
          name: "status",
          rules: [
            {
              required: drawerState === "add",
              message: t("devices.drawer.fields.status.errorMessage"),
            },
          ],
          select: {
            options: getStatuses(t),
          },
          inputType: "select",
        },
        {
          initialValue: device?.sshParameters || "",
          locales: {
            label: "devices.drawer.fields.sshParameters.label",
            placeholder: "devices.drawer.fields.sshParameters.placeholder",
          },
          name: "sshParameters",
          rules: [{ required: false }],
          inputType: "input",
        },
        {
          initialValue: device?.code || null,
          locales: {
            label: "devices.drawer.fields.code.label",
            placeholder: "devices.drawer.fields.code.placeholder",
          },
          name: "code",
          rules: [
            { required: device ? true : false },
            {
              pattern: /^[a-zA-Z\s\d!@#$%^&*()_+{}[\]:;<>,.?~\\/`'"\-|=]+$/,
              message: t("devices.drawer.fields.code.errorMessage"),
            },
          ],
          inputType: "input",
          extraField: device ? (
            <CopyButton
              copyText={device.code}
              entityKey="device"
              entityName={device.name}
            />
          ) : (
            <></>
          ),
        },
        {
          initialValue: device?.additionalData || "",
          locales: {
            label: "devices.drawer.fields.additionalData.label",
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
