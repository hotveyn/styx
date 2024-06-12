import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Col, Popconfirm, Row, Tooltip, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { TFunction } from "i18next";
import { CameraEntity } from "../../api/data-contracts";
import { formatDateTimeType } from "../../constants/common";
import { IDrawerHandler } from "../../types/common";

export const getCamerasColumns = (
  drawerHandler: IDrawerHandler<CameraEntity>,
  handleDelete: (id: number) => void,
  isDeleteLoading: boolean,
  t: TFunction<"translation">
): ColumnsType<CameraEntity> => {
  const { Text } = Typography;

  return [
    {
      title: t("cameras.columns.id"),
      dataIndex: "id",
      align: "center",
      sorter: true,
      width: "70px",
    },
    {
      title: t("cameras.columns.createdAt"),
      dataIndex: "createdAt",
      align: "left",
      render: (value) => <>{dayjs(value).format(formatDateTimeType)}</>,
      sorter: true,
      width: "150px",
    },
    {
      title: t("cameras.columns.name"),
      dataIndex: "name",
      align: "left",
      sorter: true,
      width: "300px",
    },
    {
      title: t("cameras.columns.link"),
      align: "center",
      width: "200px",
      dataIndex: "link",
      render: (value) => (
        <a href={`${value}`} target="_blank">
          <Text>{value}</Text>
        </a>
      ),
    },
    {
      title: t("cameras.columns.organization"),
      align: "center",
      width: "100px",
      dataIndex: ["organization", "name"],
    },
    {
      title: t("table.actions"),
      align: "center",
      width: "150px",
      fixed: "right",
      render: (_, row) => (
        <Row gutter={20} justify={"center"}>
          <Col>
            <Tooltip title={t("confirms.camera.edit")}>
              <Button
                onClick={() => drawerHandler(true, "edit", row)}
                icon={<EditOutlined />}
                type="primary"
              ></Button>
            </Tooltip>
          </Col>
          <Col>
            <Tooltip title={t("confirms.camera.view")}>
              <Button
                icon={<EyeOutlined />}
                type="primary"
                onClick={() => drawerHandler(true, "view", row)}
              ></Button>
            </Tooltip>
          </Col>
          <Col>
            <Popconfirm
              title={`${t("confirms.camera.delete")}?`}
              onConfirm={() => handleDelete(+row.id)}
              okText={t("words.yes")}
              cancelText={t("words.no")}
            >
              <Tooltip title={t("confirms.camera.delete")} placement="bottom">
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
