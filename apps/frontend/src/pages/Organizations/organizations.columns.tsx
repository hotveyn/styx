import { CloseOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Popconfirm, Row, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { OrganizationEntity } from "../../api/data-contracts";
import { formatDateTimeType } from "../../constants/common";
import routes from "../../constants/routes";
import { IDrawerHandler } from "../../types/common";

export const getOrganizationsColumns = (
  drawerHandler: IDrawerHandler<OrganizationEntity>,
  handleDelete: (id: number) => void,
  isDeleteLoading: boolean,
  t: TFunction<"translation">
): ColumnsType<OrganizationEntity> => {
  return [
    {
      title: t("organizations.columns.id"),
      dataIndex: "id",
      align: "center",
      sorter: true,
      width: "70px",
    },
    {
      title: t("organizations.columns.createdAt"),
      dataIndex: "createdAt",
      align: "left",
      render: (value) => <>{dayjs(value).format(formatDateTimeType)}</>,
      sorter: true,
      width: "200px",
    },
    {
      title: t("organizations.columns.name"),
      dataIndex: "name",
      align: "left",
      sorter: true,
      width: "300px",
    },
    {
      title: t("organizations.columns.deviceCount"),
      align: "center",
      width: "100px",
      render: (_, row) =>
        row._count?.devices ? (
          <Tooltip title={t("confirms.device.page")}>
            <Link to={`${routes.devices}?organizationId=${row.id}`}>
              <Button icon={row._count.devices}></Button>
            </Link>
          </Tooltip>
        ) : (
          <CloseOutlined></CloseOutlined>
        ),
    },
    {
      title: t("organizations.columns.userCount"),
      align: "center",
      width: "100px",
      render: (_, row) =>
        row._count?.users ? (
          <Tooltip title={t("confirms.user.page")}>
            <Link to={`${routes.users}?organizationId=${row.id}`}>
              <Button icon={<>{row._count.users}</>}></Button>
            </Link>
          </Tooltip>
        ) : (
          <CloseOutlined></CloseOutlined>
        ),
    },
    {
      title: t("organizations.columns.goalCount"),
      align: "center",
      width: "100px",
      render: (_, row) =>
        row._count?.goals ? (
          <Tooltip title={t("confirms.goal.page")}>
            <Link to={`${routes.goalList}?organizationId=${row.id}`}>
              <Button icon={<>{row._count.goals}</>}></Button>
            </Link>
          </Tooltip>
        ) : (
          <CloseOutlined></CloseOutlined>
        ),
    },
    {
      title: t("table.actions"),
      align: "center",
      width: "150px",
      fixed: "right",
      render: (_, row) => (
        <Row gutter={20} justify={"center"}>
          <Col>
            <Tooltip title={t("confirms.organization.edit")}>
              <Button
                onClick={() => drawerHandler(true, "edit", row)}
                icon={<EditOutlined />}
                type="primary"
              ></Button>
            </Tooltip>
          </Col>
          <Col>
            <Popconfirm
              title={`${t("confirms.organization.delete")}?`}
              onConfirm={() => handleDelete(+row.id)}
              okText={t("words.yes")}
              cancelText={t("words.no")}
            >
              <Tooltip
                title={t("confirms.organization.delete")}
                placement="bottom"
              >
                <Button
                  icon={<DeleteOutlined />}
                  type="primary"
                  danger
                  loading={isDeleteLoading}
                ></Button>
              </Tooltip>
            </Popconfirm>
          </Col>
        </Row>
      ),
    },
  ];
};
