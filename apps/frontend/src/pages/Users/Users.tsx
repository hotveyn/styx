import { notification } from "antd";
import { AxiosError } from "axios";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import {
  UserControllerRemoveError,
  UserEntity,
} from "../../api/data-contracts";
import UserForm from "../../components/forms/UserForm/UserForm";
import Drawer from "../../components/ui/Drawer/Drawer";
import Table from "../../components/ui/Table/Table";
import { getNavLabels } from "../../constants/common";
import queryKeys from "../../constants/queryKeys";
import useSetPageTitle from "../../hooks/useSetPageTitle";
import filterStore from "../../store/FilterStore";
import { DrawerState, IDrawerHandler } from "../../types/common";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";
import organizationApi from "../Organizations/api";
import usersApi from "./api";
import { getUsersColumns } from "./users.columns";

const Users: FC = () => {
  const { t } = useTranslation();

  useSetPageTitle(getNavLabels(t).users);

  const filters = filterStore.useState();

  const {
    data,
    refetch,
    isFetching: isUsersLoading,
  } = useQuery({
    queryKey: [queryKeys.getUsers, filters],
    queryFn: () => usersApi.getUsers(filters),
    onError: () => {
      notification.error({
        message: t("users.queries.get.error"),
      });
    },
    keepPreviousData: true,
  });

  const { mutate: deleteMutate, isLoading: isDeleteLoading } = useMutation({
    mutationKey: [queryKeys.deleteUser],
    mutationFn: (userId: number) => usersApi.deleteUser(userId),
    onSuccess: () => {
      refetch();
      notification.success({
        message: t("users.queries.delete.success"),
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
    onError: (error: AxiosError<UserControllerRemoveError>) => {
      if (error.response?.data.thing) {
        const translatedError = getApiErrorMessage(
          t,
          error.response.data.thing
        );
        notification.error({
          message: translatedError || t("organizations.queries.get.error"),
        });
      }
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
  const [user, setUser] = useState<UserEntity | null>(null);

  const handleDrawerOpen: IDrawerHandler<UserEntity> = (
    isOpen,
    drawerState,
    entity
  ) => {
    setIsDrawerVisible(isOpen);
    setDrawerState(drawerState);
    setUser(entity);
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

  const drawerTitle =
    drawerState === "add"
      ? t("users.drawer.addTitle")
      : t("users.drawer.editTitle");

  const tableTitle =
    filters.filters.organizationId && organization
      ? `${t("titles.selectedOrganization.users")} - ${organization.data[0].name}`
      : getNavLabels(t).users;

  return (
    <>
      <Drawer
        isVisible={isDrawerVisible}
        setIsVisible={setIsDrawerVisible}
        title={drawerTitle}
      >
        <UserForm
          drawerState={drawerState}
          refetch={refetch}
          handleDrawerOpen={handleDrawerOpen}
          user={user}
        />
      </Drawer>
      <Table<UserEntity>
        columns={getUsersColumns(
          handleDrawerOpen,
          deleteMutate,
          isDeleteLoading,
          t
        )}
        dataSource={data?.data}
        isLoading={isUsersLoading}
        title={tableTitle}
        total={data?.count as string}
        drawerHandler={handleDrawerOpen}
        tooltipText={t("confirms.user.add")}
        hasBackButton={Boolean(filters.filters.organizationId)}
      />
    </>
  );
};

export default Users;
