import {
  ApiOutlined,
  CaretRightOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Space, Tag, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { DeviceEntity } from "../../api/data-contracts";
import CopyButton from "../../components/ui/CopyButton/CopyButton";
import { formatDateTimeType, statusesColor } from "../../constants/common";
import routes from "../../constants/routes.ts";
import statusTranslationKeys from "../../constants/statusTranslationKeys";
import { IDrawerHandler, ISshHandler } from "../../types/common.ts";

export const getDevicesColumns = (
  drawerHandler: IDrawerHandler<DeviceEntity>,
  sshHandler: ISshHandler<DeviceEntity>,
  handleDelete: (id: number) => void,
  isDeleteLoading: boolean,
  t: TFunction<"translation">
): ColumnsType<DeviceEntity> => {
  return [
    {
      title: t("devices.columns.createdAt"),
      dataIndex: "createdAt",
      align: "left",
      sorter: true,
      render: (value) => <>{dayjs(value).format(formatDateTimeType)}</>,
      width: "170px",
    },
    {
      title: t("devices.columns.name"),
      dataIndex: "name",
      align: "left",
      sorter: true,
      width: "150px",
    },

    {
      title: t("devices.columns.organizationName"),
      dataIndex: ["organization", "name"],
      align: "center",
      render: (value) => value || <CloseOutlined />,
      width: "200px",
    },
    {
      title: t("devices.columns.deviceType"),
      dataIndex: "deviceType",
      align: "center",
      sorter: true,
      width: "200px",
    },
    {
      title: t("devices.columns.ip"),
      dataIndex: "ip",
      align: "center",
      sorter: true,
      width: "200px",
      render: (_, row) => (
        <>
          {row.ip}:{row.port}
        </>
      ),
    },
    {
      title: t("devices.columns.softwareType"),
      dataIndex: "softwareType",
      align: "center",
      width: "200px",
      sorter: true,
      render: (value) => value || <CloseOutlined />,
    },
    {
      title: t("devices.columns.softwareVersion"),
      dataIndex: "softwareVersion",
      align: "center",
      width: "200px",
      sorter: true,
      render: (value) => value || <CloseOutlined />,
    },
    {
      title: t("devices.columns.status"),
      dataIndex: "status",
      align: "center",
      sorter: true,
      width: "100px",
      fixed: "right",
      render: (value) => (
        <Tag color={statusesColor[value]}>
          {t(
            statusTranslationKeys[value as keyof typeof statusTranslationKeys]
          )}
        </Tag>
      ),
    },
    {
      title: t("devices.columns.code"),
      dataIndex: "code",
      align: "right",
      sorter: true,
      width: "250px",
      fixed: "right",
      render: (_, row) => (
        <Space size={4}>
          <span style={{ wordBreak: "break-all" }}>
            {row.code}{" "}
            <CopyButton
              copyText={row.code}
              entityKey="device"
              entityName={row.name}
            />
          </span>
        </Space>
      ),
    },
    {
      title: t("table.actions"),
      align: "center",
      width: "250px",
      fixed: "right",
      render: (_, row) => (
        <Space>
          <Tooltip title={t("confirms.logs.page")}>
            <Link to={routes.device.replace(":id", `${row.code}`)}>
              <Button icon={<CaretRightOutlined />}></Button>
            </Link>
          </Tooltip>
          <Tooltip title={t("confirms.device.ssh")}>
            <Button
              onClick={() => sshHandler(true, row)}
              icon={<ApiOutlined />}
              disabled={!row.sshParameters || row.sshParameters === ""}
              type="primary"
              ghost
            ></Button>
          </Tooltip>
          <Tooltip title={t("confirms.device.view")}>
            <Button
              onClick={() => drawerHandler(true, "view", row)}
              icon={<EyeOutlined />}
              type="primary"
            ></Button>
          </Tooltip>
          <Tooltip title={t("confirms.device.edit")}>
            <Button
              onClick={() => drawerHandler(true, "edit", row)}
              icon={<EditOutlined />}
              type="primary"
            ></Button>
          </Tooltip>
          <Popconfirm
            title={`${t("confirms.device.delete")}?`}
            onConfirm={() => handleDelete(+row.id)}
            okText={t("words.yes")}
            cancelText={t("words.no")}
          >
            <Tooltip title={t("confirms.device.delete")} placement="bottom">
              <Button
                icon={<DeleteOutlined />}
                type="primary"
                danger
                loading={isDeleteLoading}
              ></Button>
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];
};
