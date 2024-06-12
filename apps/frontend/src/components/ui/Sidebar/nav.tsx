import {
  AppstoreOutlined,
  BarChartOutlined,
  CameraOutlined,
  CheckCircleOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  LineChartOutlined,
  MonitorOutlined,
  ReadOutlined,
  SettingOutlined,
  TeamOutlined,
  ToolOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { getNavLabels } from "../../../constants/common";
import routes from "../../../constants/routes";
import { reportTypes } from "../../../pages/Reports/reports.data";

type MenuItem = Required<MenuProps>["items"][number];

export const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[] | null
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
};

export const getMenuItems: (
  t: TFunction<"translation">,
  isAdmin: boolean
) => MenuProps["items"] = (t, isAdmin) => {
  return [
    getItem(
      getNavLabels(t).statistics,
      routes.statistics,
      <BarChartOutlined />,
      [
        getItem(
          <Link to={`${routes.monitoring}`}>{getNavLabels(t).monitoring}</Link>,
          routes.monitoring,
          <MonitorOutlined />
        ),
        getItem(
          <Link
            to={routes.reports.replace(
              "/:reportName",
              `/${Object.keys(reportTypes)[0]}`
            )}
          >
            {getNavLabels(t).reports}
          </Link>,
          routes.reports.replace(
            "/:reportName",
            `/${Object.keys(reportTypes)[0]}`
          ),
          <FileTextOutlined />
        ),
      ]
    ),
    getItem(
      <Link to={`${routes.devices}`}>{getNavLabels(t).devices}</Link>,
      routes.devices,
      <DatabaseOutlined />
    ),
    isAdmin
      ? getItem(
          <Link to={`${routes.applications}`}>
            {getNavLabels(t).applications}
          </Link>,
          routes.applications,
          <AppstoreOutlined />
        )
      : null,
    getItem(getNavLabels(t).goals, routes.goals, <TrophyOutlined />, [
      getItem(
        <Link to={`${routes.goalList}`}>{getNavLabels(t).goalList}</Link>,
        routes.goalList,
        <TrophyOutlined />
      ),
      getItem(
        <Link to={routes.goalsStatistics}>{getNavLabels(t).goalsAchieve}</Link>,
        routes.goalsStatistics,
        <LineChartOutlined />
      ),
      getItem(
        <Link to={`${routes.achievedGoals}`}>
          {getNavLabels(t).achievedGoals}
        </Link>,
        routes.achievedGoals,
        <CheckCircleOutlined />
      ),
      getItem(
        <Link to={routes.goalAchieve}>{"Достижение целей"}</Link>,
        routes.goalAchieve,
        <ToolOutlined />
      ),
    ]),
    isAdmin
      ? getItem(
          <Link to={`${routes.organizations}`}>
            {getNavLabels(t).organizations}
          </Link>,
          routes.organizations,
          <TeamOutlined />
        )
      : null,
    getItem(
      <Link to={`${routes.users}`}>{getNavLabels(t).users}</Link>,
      routes.users,
      <UserOutlined />
    ),
    getItem(
      <Link to={`${routes.cameras}`}>{getNavLabels(t).cameras}</Link>,
      routes.cameras,
      <CameraOutlined />
    ),
    isAdmin
      ? getItem(
          <Link to={`${routes.params}`}>{getNavLabels(t).params}</Link>,
          routes.params,
          <SettingOutlined />
        )
      : null,
    getItem(
      <Link to={`${routes.docs}`}>{getNavLabels(t).docs}</Link>,
      routes.docs,
      <ReadOutlined />
    ),
  ];
};
