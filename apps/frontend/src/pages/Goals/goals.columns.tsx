import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Popconfirm, Row, Space, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { TFunction } from "i18next";
import { GoalEntity } from "../../api/data-contracts";
import CopyButton from "../../components/ui/CopyButton/CopyButton";
import { formatDateTimeType } from "../../constants/common";
import { IDrawerHandler } from "../../types/common";

export const getGoalsColumns = (
  drawerHandler: IDrawerHandler<GoalEntity>,
  handleDelete: (id: number) => void,
  isDeleteLoading: boolean,
  t: TFunction<"translation">
): ColumnsType<GoalEntity> => {
  return [
    {
      title: t("goals.columns.createdAt"),
      dataIndex: "createdAt",
      sorter: true,
      render: (value) => <>{dayjs(value).format(formatDateTimeType)}</>,
      width: "200px",
    },
    {
      title: t("goals.columns.name"),
      dataIndex: "name",
      sorter: true,
      width: "300px",
    },
    {
      title: t("goals.columns.description"),
      dataIndex: "description",
      sorter: true,
    },
    {
      title: t("goals.columns.code"),
      dataIndex: "code",
      align: "right",
      sorter: true,
      render: (_, row) => (
        <Space size={4}>
          <span style={{ wordBreak: "break-all" }}>
            {row.code}{" "}
            <CopyButton
              copyText={row.code}
              entityKey="goal"
              entityName={row.name}
            />
          </span>
        </Space>
      ),
    },
    {
      title: t("goals.columns.organizationName"),
      dataIndex: ["organization", "name"],
      align: "center",
    },
    {
      title: t("table.actions"),
      align: "center",
      width: "150px",
      fixed: "right",
      render: (_, row) => (
        <Row gutter={10} justify={"center"}>
          <Col>
            <Tooltip title={t("confirms.goal.edit")}>
              <Button
                onClick={() => drawerHandler(true, "edit", row)}
                icon={<EditOutlined />}
                type="primary"
              ></Button>
            </Tooltip>
          </Col>
          <Col>
            <Popconfirm
              title={`${t("confirms.goal.delete")}?`}
              onConfirm={() => handleDelete(+row.id)}
              okText={t("words.yes")}
              cancelText={t("words.no")}
            >
              <Tooltip title={t("confirms.goal.delete")} placement="bottom">
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
