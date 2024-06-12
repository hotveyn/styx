import { ConfigProvider, theme } from "antd";
import { Locale } from "antd/es/locale";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { FC, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import locale from "../constants/locale";
import userProfileStore from "../store/UserProfileStore";

const LocaleProvider: FC<PropsWithChildren> = ({ children }) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const { i18n } = useTranslation();

  const userProfile = userProfileStore.useState((s) => s);

  const userTheme =
    userProfile.additionalData && JSON.parse(userProfile.additionalData)?.theme;

  const isDarkTheme = userTheme === "dark" ? true : false;

  const antTheme = {
    token: {
      colorPrimary: "#1677ff",
      bgColor: "#FFFFFF",
    },
    algorithm: isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
  };

  return (
    <ConfigProvider
      locale={locale[i18n.language as keyof typeof locale] as Locale}
      theme={{ ...antTheme }}
    >
      {children}
    </ConfigProvider>
  );
};

export default LocaleProvider;
