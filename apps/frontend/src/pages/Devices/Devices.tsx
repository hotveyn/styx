import { Modal, notification } from "antd";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { DeviceEntity } from "../../api/data-contracts";
import DeviceInfo from "../../components/common/DeviceInfo/DeviceInfo";
import DeviceForm from "../../components/forms/DeviceForm/DeviceForm";
import Drawer from "../../components/ui/Drawer/Drawer";
import Table from "../../components/ui/Table/Table";
import { getNavLabels } from "../../constants/common";
import queryKeys from "../../constants/queryKeys";
import useSetPageTitle from "../../hooks/useSetPageTitle";
import filterStore from "../../store/FilterStore";
import { DrawerState, IDrawerHandler, ISshHandler } from "../../types/common";
import organizationApi from "../Organizations/api";
import SshTerminal from "./SshTerminal.tsx";
import deviceApi from "./api";
import { getDevicesColumns } from "./devices.columns";

const Devices: FC = () => {
  const { t } = useTranslation();

  useSetPageTitle(getNavLabels(t).devices);

  const filters = filterStore.useState();

  const {
    data,
    refetch,
    isFetching: isDevicesLoading,
  } = useQuery({
    queryKey: [queryKeys.getDevices, filters],
    queryFn: () => deviceApi.getDevices(filters),
    onError: () => {
      notification.error({
        message: t("devices.queries.get.error"),
      });
    },
    keepPreviousData: true,
  });

  const { mutate: deleteMutate, isLoading: isDeleteLoading } = useMutation({
    mutationKey: [queryKeys.deleteDevice],
    mutationFn: (deviceId: number) => deviceApi.deleteDevice(deviceId),
    onSuccess: () => {
      refetch();
      notification.success({
        message: t("devices.queries.delete.success"),
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
        message: t("devices.queries.delete.error"),
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
  const [isSshModalVisible, setIsSshModalVisible] = useState(false);
  const [drawerState, setDrawerState] = useState<DrawerState>("");
  const [device, setDevice] = useState<DeviceEntity | null>(null);

  const handleDrawerOpen: IDrawerHandler<DeviceEntity> = (
    isOpen,
    drawerState,
    entity
  ) => {
    setIsDrawerVisible(isOpen);
    setDrawerState(drawerState);
    setDevice(entity);
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

  const handleSsh: ISshHandler<DeviceEntity> = (isOpen, entity) => {
    setIsSshModalVisible(isOpen);
    setDevice(entity);
  };

  const getDrawerTitle = () => {
    if (drawerState === "add") return t("devices.drawer.addTitle");
    if (drawerState === "edit") return t("devices.drawer.editTitle");
    return `${t("devices.drawer.viewTitle")} - ${device?.name}`;
  };

  const tableTitle =
    filters.filters.organizationId && organization
      ? `${t("titles.selectedOrganization.devices")} - ${organization.data[0].name}`
      : getNavLabels(t).devices;

  const getDrawerContent = () => {
    if (drawerState === "view") return <DeviceInfo device={device!} />;
    return (
      <DeviceForm
        drawerState={drawerState}
        refetch={refetch}
        handleDrawerOpen={handleDrawerOpen}
        device={device}
      />
    );
  };

  return (
    <>
      <Drawer
        isVisible={isDrawerVisible}
        setIsVisible={setIsDrawerVisible}
        title={getDrawerTitle()}
      >
        {getDrawerContent()}
      </Drawer>
      <Modal
        width={700}
        title="ssh"
        open={isSshModalVisible}
        footer={[]}
        onCancel={() => handleSsh(false, null)}
        destroyOnClose
      >
        <SshTerminal device={device} />
      </Modal>
      <Table<DeviceEntity>
        columns={getDevicesColumns(
          handleDrawerOpen,
          handleSsh,
          deleteMutate,
          isDeleteLoading,
          t
        )}
        dataSource={data?.data}
        isLoading={isDevicesLoading}
        title={tableTitle}
        total={data?.count as string}
        drawerHandler={handleDrawerOpen}
        tooltipText={t("confirms.device.add")}
        hasBackButton={Boolean(filters.filters.organizationId)}
      />
    </>
  );
};

export default Devices;
