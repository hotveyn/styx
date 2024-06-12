import { notification } from "antd";
import { AxiosError } from "axios";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import {
  OrganizationControllerRemoveError,
  OrganizationEntity,
} from "../../api/data-contracts";
import OrganizationForm from "../../components/forms/OrganizationForm/OrganizationForm";
import Drawer from "../../components/ui/Drawer/Drawer";
import Table from "../../components/ui/Table/Table";
import { getNavLabels } from "../../constants/common";
import queryKeys from "../../constants/queryKeys";
import useSetPageTitle from "../../hooks/useSetPageTitle";
import filterStore from "../../store/FilterStore";
import userProfileStore from "../../store/UserProfileStore";
import { DrawerState, IDrawerHandler } from "../../types/common";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";
import api from "./api";
import { getOrganizationsColumns } from "./organizations.columns";

const Organizations: FC = () => {
  const { t } = useTranslation();

  useSetPageTitle(getNavLabels(t).organizations);

  const filters = filterStore.useState();

  const {
    data,
    refetch,
    isFetching: isOrganizationsLoading,
  } = useQuery({
    queryKey: [queryKeys.getOrganizations, filters],
    queryFn: () => api.getOrganizations(filters),
    onError: () => {
      notification.error({
        message: t("organizations.queries.get.error"),
      });
    },
    keepPreviousData: true,
  });

  const { mutate: deleteMutate, isLoading: isDeleteLoading } = useMutation({
    mutationKey: [queryKeys.deleteOrganization],
    mutationFn: (organizationId: number) =>
      api.deleteOrganization(organizationId),
    onSuccess: () => {
      refetch();
      notification.success({
        message: t("organizations.queries.delete.success"),
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
    onError: (error: AxiosError<OrganizationControllerRemoveError>) => {
      if (error.response?.data.thing) {
        const translatedError = getApiErrorMessage(
          t,
          error.response.data.thing
        );
        notification.error({
          message: translatedError || t("organizations.queries.delete.error"),
        });
      }
    },
  });

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [drawerState, setDrawerState] = useState<DrawerState>("");
  const [organization, setOrganization] = useState<OrganizationEntity | null>(
    null
  );

  const handleDrawerOpen: IDrawerHandler<OrganizationEntity> = (
    isOpen,
    drawerState,
    entity
  ) => {
    setIsDrawerVisible(isOpen);
    setDrawerState(drawerState);
    setOrganization(entity);
  };

  const drawerTitle =
    drawerState === "add"
      ? t("organizations.drawer.addTitle")
      : t("organizations.drawer.editTitle");

  return (
    <>
      <Drawer
        isVisible={isDrawerVisible}
        setIsVisible={setIsDrawerVisible}
        title={drawerTitle}
      >
        <OrganizationForm
          drawerState={drawerState}
          refetch={refetch}
          handleDrawerOpen={handleDrawerOpen}
          organization={organization}
        />
      </Drawer>
      <Table<OrganizationEntity>
        columns={getOrganizationsColumns(
          handleDrawerOpen,
          deleteMutate,
          isDeleteLoading,
          t
        )}
        dataSource={data?.data}
        isLoading={isOrganizationsLoading}
        title={getNavLabels(t).organizations}
        total={data?.count as string}
        drawerHandler={handleDrawerOpen}
        tooltipText={t("confirms.organization.add")}
        canAdd={!userProfileStore.getRawState().organizationId}
      />
    </>
  );
};

export default Organizations;
