import {
  CaretRightOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Button, Col, MenuProps, Popconfirm, Tooltip } from "antd";
import { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { DeviceEntity } from "../../api/data-contracts";
import routes from "../../constants/routes";
import { IDrawerHandler } from "../../types/common";

export const getDeviceButtonActions: (
  device: DeviceEntity,
  t: TFunction<"translation">,
  drawerHandler: IDrawerHandler<DeviceEntity>,
  handleDelete: (id: number) => void,
  isDeleteLoading: boolean
) => MenuProps["items"] = (
  device,
  t,
  drawerHandler,
  handleDelete,
  isDeleteLoading
) => {
  return [
    {
      key: "1",
      label: (
        <Col>
          <Tooltip title={t("confirms.logs.page")} placement="left">
            <Link
              to={routes.device.replace(":logType/:id", `info/${device.code}`)}
            >
              <Button icon={<CaretRightOutlined />}></Button>
            </Link>
          </Tooltip>
        </Col>
      ),
    },
    {
      key: "2",
      label: (
        <Col>
          <Tooltip title={t("confirms.device.view")} placement="left">
            <Button
              onClick={() => drawerHandler(true, "view", device)}
              icon={<EyeOutlined />}
              type="primary"
            ></Button>
          </Tooltip>
        </Col>
      ),
    },
    {
      key: "3",
      label: (
        <Col>
          <Tooltip title={t("confirms.device.edit")} placement="left">
            <Button
              onClick={() => drawerHandler(true, "edit", device)}
              icon={<EditOutlined />}
              type="primary"
            ></Button>
          </Tooltip>
        </Col>
      ),
    },
    {
      key: "4",
      label: (
        <Col>
          <Popconfirm
            title={`${t("confirms.device.delete")}?`}
            onConfirm={() => handleDelete(+device.id)}
            okText={t("words.yes")}
            cancelText={t("words.no")}
          >
            <Tooltip title={t("confirms.device.delete")} placement="left">
              <Button
                icon={<DeleteOutlined />}
                type="primary"
                danger
                loading={isDeleteLoading}
              ></Button>
            </Tooltip>
          </Popconfirm>
        </Col>
      ),
    },
  ];
};
