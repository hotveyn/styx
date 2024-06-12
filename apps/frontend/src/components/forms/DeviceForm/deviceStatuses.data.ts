import { TFunction } from "i18next";

export const getStatuses = (t: TFunction<"translation">) => [
  { label: t("devices.statuses.new"), value: "NEW" },
  { label: t("devices.statuses.waited"), value: "WAITED" },
  { label: t("devices.statuses.work"), value: "WORK" },
  { label: t("devices.statuses.stopped"), value: "STOPPED" },
];
