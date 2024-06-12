import { notification } from "antd";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { GoalEntity } from "../../api/data-contracts";
import GoalForm from "../../components/forms/GoalForm/GoalForm";
import Drawer from "../../components/ui/Drawer/Drawer";
import Table from "../../components/ui/Table/Table";
import { getNavLabels } from "../../constants/common";
import queryKeys from "../../constants/queryKeys";
import useSetPageTitle from "../../hooks/useSetPageTitle";
import filterStore from "../../store/FilterStore";
import { DrawerState, IDrawerHandler } from "../../types/common";
import organizationApi from "../Organizations/api";
import goalApi from "./api";
import { getGoalsColumns } from "./goals.columns";

const Goals: FC = () => {
  const { t } = useTranslation();

  useSetPageTitle(getNavLabels(t).goals);

  const filters = filterStore.useState();

  const {
    data,
    refetch,
    isFetching: isGoalsLoading,
  } = useQuery({
    queryKey: [queryKeys.getGoals, filters],
    queryFn: () => goalApi.getGoals(filters),
    onError: () => {
      notification.error({
        message: t("goals.queries.get.error"),
      });
    },
    keepPreviousData: true,
  });

  const { mutate: deleteMutate, isLoading: isDeleteLoading } = useMutation({
    mutationKey: [queryKeys.deleteGoal],
    mutationFn: (goalId: number) => goalApi.deleteGoal(goalId),
    onSuccess: () => {
      refetch();
      notification.success({
        message: t("goals.queries.delete.success"),
      });
      if (Number(data?.data.length) === 1 && filters.pagination.offset > 10) {
        filterStore.update((s) => ({
          ...s,
          pagination: {
            limit: s.pagination.limit,
            offset: s.pagination.offset - 10,
          },
        }));
      }
    },
    onError: () => {
      notification.error({
        message: t("goals.queries.delete.error"),
      });
    },
  });

  const { data: organization } = useQuery({
    queryKey: [queryKeys.getOrganizations],
    queryFn: () =>
      organizationApi.getOrganizationById(filters.filters.organizationId || ""),
    onError: () => {
      notification.error({
        message: t("organizations.queries.get.error"),
      });
    },
    enabled: Boolean(filters.filters.organizationId),
  });

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [drawerState, setDrawerState] = useState<DrawerState>("");
  const [goal, setGoal] = useState<GoalEntity | null>(null);

  const handleDrawerOpen: IDrawerHandler<GoalEntity> = (
    isOpen,
    drawerState,
    entity
  ) => {
    setIsDrawerVisible(isOpen);
    setDrawerState(drawerState);
    setGoal(entity);
  };

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const organizationId = searchParams.get("organizationId");
    if (organizationId) {
      filterStore.update((s) => ({
        ...s,
        filters: {
          ...s.filters,
          organizationId,
        },
      }));
    }
  }, []);

  const tableTitle =
    filters.filters.organizationId && organization
      ? `${t("titles.selectedOrganization.goals")} - ${organization.data[0].name}`
      : getNavLabels(t).goals;

  const drawerTitle =
    drawerState === "add"
      ? t("goals.drawer.addTitle")
      : t("goals.drawer.editTitle");

  return (
    <>
      <Drawer
        isVisible={isDrawerVisible}
        setIsVisible={setIsDrawerVisible}
        title={drawerTitle}
      >
        <GoalForm
          drawerState={drawerState}
          refetch={refetch}
          handleDrawerState={handleDrawerOpen}
          goal={goal}
        />
      </Drawer>
      <Table<GoalEntity>
        columns={getGoalsColumns(
          handleDrawerOpen,
          deleteMutate,
          isDeleteLoading,
          t
        )}
        dataSource={data?.data}
        isLoading={isGoalsLoading}
        title={tableTitle}
        total={data?.count as string}
        drawerHandler={handleDrawerOpen}
        tooltipText={t("confirms.goal.add")}
        hasBackButton={Boolean(filters.filters.organizationId)}
      />
    </>
  );
};

export default Goals;
