import { notification } from "antd";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { CameraEntity } from "../../api/data-contracts";
import CameraInfo from "../../components/common/CameraInfo/CameraInfo";
import CameraForm from "../../components/forms/CameraForm/CameraForm";
import Drawer from "../../components/ui/Drawer/Drawer";
import Table from "../../components/ui/Table/Table";
import { getNavLabels } from "../../constants/common";
import queryKeys from "../../constants/queryKeys";
import useSetPageTitle from "../../hooks/useSetPageTitle";
import filterStore from "../../store/FilterStore";
import { DrawerState, IDrawerHandler } from "../../types/common";
import api from "./api";
import { getCamerasColumns } from "./cameras.columns";

const Cameras: FC = () => {
  const { t } = useTranslation();

  useSetPageTitle(getNavLabels(t).organizations);

  const filters = filterStore.useState();

  const {
    data,
    refetch,
    isFetching: isCamerasLoading,
  } = useQuery({
    queryKey: [queryKeys.getCameras, filters],
    queryFn: () => api.getCameras(filters),
    onError: () => {
      notification.error({
        message: t("cameras.queries.get.error"),
      });
    },
    keepPreviousData: true,
  });

  const { mutate: deleteMutate, isLoading: isDeleteLoading } = useMutation({
    mutationKey: [queryKeys.deleteCamera],
    mutationFn: (organizationId: number) => api.deleteCamera(organizationId),
    onSuccess: () => {
      refetch();
      notification.success({
        message: t("cameras.queries.delete.success"),
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
        message: t("cameras.queries.delete.error"),
      });
    },
  });

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [drawerState, setDrawerState] = useState<DrawerState>("");
  const [camera, setCamera] = useState<CameraEntity | null>(null);

  const getDrawerTitle = () => {
    if (drawerState === "add") return t("cameras.drawer.addTitle");
    if (drawerState === "edit") return t("cameras.drawer.editTitle");
    return `${t("cameras.drawer.viewTitle")} - ${camera?.name}`;
  };

  const getDrawerContent = () => {
    if (drawerState === "view") return <CameraInfo camera={camera!} />;
    return (
      <CameraForm
        camera={camera}
        drawerState={drawerState}
        handleDrawerOpen={handleDrawerOpen}
        refetch={refetch}
      />
    );
  };

  const handleDrawerOpen: IDrawerHandler<CameraEntity> = (
    isOpen,
    drawerState,
    entity
  ) => {
    setIsDrawerVisible(isOpen);
    setDrawerState(drawerState);
    setCamera(entity);
  };

  return (
    <>
      <Drawer
        isVisible={isDrawerVisible}
        setIsVisible={setIsDrawerVisible}
        title={getDrawerTitle()}
        width={drawerState === "view" ? "800px" : "600px"}
      >
        {getDrawerContent()}
      </Drawer>
      <Table<CameraEntity>
        columns={getCamerasColumns(
          handleDrawerOpen,
          deleteMutate,
          isDeleteLoading,
          t
        )}
        dataSource={data?.data}
        isLoading={isCamerasLoading}
        title={getNavLabels(t).cameras}
        total={data?.count as string}
        drawerHandler={handleDrawerOpen}
        tooltipText={t("confirms.camera.add")}
      />
    </>
  );
};

export default Cameras;
