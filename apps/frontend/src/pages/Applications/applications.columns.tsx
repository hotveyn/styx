import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Popconfirm, Row, Tooltip, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { TFunction } from "i18next";
import { ApplicationEntity } from "../../api/data-contracts";
import { formatDateTimeType } from "../../constants/common";
import { IDrawerHandler } from "../../types/common";

export const getApplicationColumns = (
  drawerHandler: IDrawerHandler<ApplicationEntity>,
  handleDelete: (name: string) => void,
  isDeleteLoading: boolean,
  t: TFunction<"translation">
): ColumnsType<ApplicationEntity> => {
  const { Text } = Typography;

  return [
    {
      title: t("applications.columns.createdAt"),
      dataIndex: "createdAt",
      align: "center",
      render: (value) => <>{dayjs(value).format(formatDateTimeType)}</>,
      sorter: true,
      width: "200px",
    },
    {
      title: t("applications.columns.name"),
      dataIndex: "name",
      align: "left",
      sorter: true,
      render: (value) => (
        <a
          href={`${import.meta.env.VITE_HOST_URL}/api/apps/${value}/`}
          target="_blank"
          style={{ textDecoration: "underline" }}
        >
          <Text>{value}</Text>
        </a>
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
            <Tooltip title={t("confirms.applications.edit")}>
              <Button
                onClick={() => drawerHandler(true, "edit", row)}
                icon={<EditOutlined />}
                type="primary"
              ></Button>
            </Tooltip>
          </Col>
          <Col>
            <Popconfirm
              title={`${t("confirms.applications.delete")}?`}
              onConfirm={() => handleDelete(row.name)}
              okText={t("words.yes")}
              cancelText={t("words.no")}
            >
              <Tooltip
                title={t("confirms.applications.delete")}
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
