import { Button, Space, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { TFunction } from "i18next";
import {
  GoalAchieveGroupEntity,
  GoalAchieveQueryEntity,
} from "../../api/data-contracts";
import CopyButton from "../../components/ui/CopyButton/CopyButton";
import { formatDateTimeType } from "../../constants/common";

export const getAchievedGoalColumns = (
  t: TFunction<"translation">,
  isFilteredGoals: boolean,
  handleChangePage: (deviceId: string, goalId: string) => void,
  isCodeShow: boolean
): ColumnsType<GoalAchieveGroupEntity | GoalAchieveQueryEntity> => {
  const renderEntityName = (
    type: "device" | "goal",
    row: GoalAchieveGroupEntity & GoalAchieveQueryEntity
  ) => {
    if (type === "device") {
      return isCodeShow ? (
        <Space size={4}>
          <span style={{ wordBreak: "break-all" }}>
            <div>{row.device?.name || row.deviceName}</div>
            <div>
              {row.device?.code || row.deviceCode}{" "}
              <CopyButton
                copyText={row.device?.code || row.deviceCode}
                entityKey="device"
                entityName={row.device?.name || row.deviceName}
              />
            </div>
          </span>
        </Space>
      ) : (
        <>{row.device?.name || row.deviceName}</>
      );
    } else {
      return isCodeShow ? (
        <Space size={4}>
          <span style={{ wordBreak: "break-all" }}>
            <div>{row.goal?.name || row.goalName}</div>{" "}
            <div>
              {row.goal?.code || row.goalCode}{" "}
              <CopyButton
                copyText={row.goal?.code || row.goalCode}
                entityKey="goal"
                entityName={row.goal?.name || row.goalName}
              />
            </div>
          </span>
        </Space>
      ) : (
        <>{row.goal?.name || row.goalName}</>
      );
    }
  };

  return [
    isFilteredGoals
      ? {
          title: t("achievedGoals.columns.createdAt"),
          dataIndex: "createdAt",
          render: (value) => <>{dayjs(value).format(formatDateTimeType)}</>,
        }
      : {
          hidden: true,
        },
    {
      title: t("achievedGoals.columns.device"),
      render: (_, row) =>
        renderEntityName(
          "device",
          row as GoalAchieveGroupEntity & GoalAchieveQueryEntity
        ),
    },
    {
      title: t("achievedGoals.columns.goal"),
      render: (_, row) =>
        renderEntityName(
          "goal",
          row as GoalAchieveGroupEntity & GoalAchieveQueryEntity
        ),
    },
    !isFilteredGoals
      ? {
          title: t("achievedGoals.columns.count"),
          width: "200px",
          align: "center",
          render: (_, row) => (
            <Tooltip title={t("confirms.goal.page")}>
              <Button
                icon={<>{(row as GoalAchieveGroupEntity).count}</>}
                onClick={() => handleChangePage(row.deviceId, row.goalId)}
              ></Button>
            </Tooltip>
          ),
        }
      : {
          hidden: true,
        },
  ];
};
