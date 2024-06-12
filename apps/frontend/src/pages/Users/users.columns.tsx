import { CloseOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Popconfirm, Row, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { TFunction } from "i18next";
import { UserEntity } from "../../api/data-contracts";
import { formatDateTimeType } from "../../constants/common";
import { IDrawerHandler } from "../../types/common";

export const getUsersColumns = (
  drawerHandler: IDrawerHandler<UserEntity>,
  handleDelete: (id: number) => void,
  isDeleteLoading: boolean,
  t: TFunction<"translation">
): ColumnsType<UserEntity> => {
  return [
    {
      title: t("users.columns.id"),
      dataIndex: "id",
      align: "center",
      sorter: true,
      width: "70px",
    },
    {
      title: t("users.columns.createdAt"),
      dataIndex: "createdAt",
      align: "left",
      render: (value) => <>{dayjs(value).format(formatDateTimeType)}</>,
      sorter: true,
      width: "200px",
    },
    {
      title: t("users.columns.name"),
      dataIndex: "name",
      align: "left",
      sorter: true,
      width: "300px",
    },
    {
      title: t("users.columns.login"),
      dataIndex: "login",
      align: "left",
      sorter: true,
    },
    {
      title: t("users.columns.email"),
      dataIndex: "email",
      align: "left",
      sorter: true,
    },
    {
      title: t("users.columns.organizationName"),
      dataIndex: ["organization", "name"],
      align: "center",
      render: (_, row) =>
        row.organization ? <>{row.organization.name}</> : <CloseOutlined />,
    },
    {
      title: t("table.actions"),
      align: "center",
      fixed: "right",
      width: "150px",
      render: (_, row) => (
        <Row gutter={10} justify={"center"}>
          <Col>
            <Tooltip title={t("confirms.user.edit")}>
              <Button
                onClick={() => drawerHandler(true, "edit", row)}
                icon={<EditOutlined />}
                type="primary"
              ></Button>
            </Tooltip>
          </Col>
          <Col>
            <Popconfirm
              title={`${t("confirms.user.delete")}?`}
              onConfirm={() => handleDelete(+row.id)}
              okText={t("words.yes")}
              cancelText={t("words.no")}
            >
              <Tooltip title={t("confirms.user.delete")} placement="bottom">
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
