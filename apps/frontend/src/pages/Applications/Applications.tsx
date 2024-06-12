import { notification } from "antd";
import { AxiosError } from "axios";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import {
  ApplicationControllerDeleteError,
  ApplicationEntity,
} from "../../api/data-contracts";
import ApplicationForm from "../../components/forms/ApplicationForm/ApplicationForm";
import Drawer from "../../components/ui/Drawer/Drawer";
import Table from "../../components/ui/Table/Table";
import { getNavLabels } from "../../constants/common";
import queryKeys from "../../constants/queryKeys";
import useSetPageTitle from "../../hooks/useSetPageTitle";
import filterStore from "../../store/FilterStore";
import { DrawerState, IDrawerHandler } from "../../types/common";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";
import api from "./api";
import { getApplicationColumns } from "./applications.columns";

const Applications: FC = () => {
  const { t } = useTranslation();

  useSetPageTitle(getNavLabels(t).applications);

  const filters = filterStore.useState();

  const { mutate: deleteMutate, isLoading: isDeleteLoading } = useMutation({
    mutationKey: [queryKeys.deleteApplication],
    mutationFn: (applicationName: string) =>
      api.deleteApplication(applicationName),
    onSuccess: () => {
      refetch();
      notification.success({
        message: t("applications.queries.delete.success"),
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
    onError: (error: AxiosError<ApplicationControllerDeleteError>) => {
      if (error.response?.data.thing) {
        const translatedError = getApiErrorMessage(
          t,
          error.response.data.thing
        );
        notification.error({
          message: translatedError || t("applications.queries.delete.error"),
        });
      }
    },
  });

  const {
    data,
    refetch,
    isFetching: isApplicationsLoading,
  } = useQuery({
    queryKey: [queryKeys.getApplications, filters],
    queryFn: () => api.getApplications(filters),
    onError: () => {
      notification.error({
        message: t("applications.queries.get.error"),
      });
    },
    keepPreviousData: true,
  });

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [drawerState, setDrawerState] = useState<DrawerState>("");
  const [application, setApplication] = useState<ApplicationEntity | null>(
    null
  );

  const handleDrawerOpen: IDrawerHandler<ApplicationEntity> = (
    isOpen,
    drawerState,
    entity
  ) => {
    setIsDrawerVisible(isOpen);
    setDrawerState(drawerState);
    setApplication(entity);
  };

  const drawerTitle =
    drawerState === "add"
      ? t("applications.drawer.addTitle")
      : t("applications.drawer.editTitle");

  return (
    <>
      <Drawer
        isVisible={isDrawerVisible}
        setIsVisible={setIsDrawerVisible}
        title={drawerTitle}
      >
        <ApplicationForm
          drawerState={drawerState}
          refetch={refetch}
          handleDrawerOpen={handleDrawerOpen}
          application={application}
        />
      </Drawer>
      <Table<ApplicationEntity>
        columns={getApplicationColumns(
          handleDrawerOpen,
          deleteMutate,
          isDeleteLoading,
          t
        )}
        dataSource={data?.data}
        isLoading={isApplicationsLoading}
        title={getNavLabels(t).applications}
        total={data?.count as string}
        drawerHandler={handleDrawerOpen}
        tooltipText={t("confirms.applications.add")}
        rowKey="name"
        width="800px"
      />
    </>
  );
};

export default Applications;
