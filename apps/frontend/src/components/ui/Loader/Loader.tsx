import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { FC } from "react";
import "./Loader.css";

interface LoaderProps {
  className?: "small" | "medium" | "large";
}

const Loader: FC<LoaderProps> = ({ className }) => (
  <div className="wrapper">
    <Spin indicator={<LoadingOutlined className={className || "small"} />} />
  </div>
);

export default Loader;
