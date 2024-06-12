import { FC } from "react";
import { CameraEntity } from "../../../api/data-contracts";

interface Props {
  camera: CameraEntity;
}

const CameraInfo: FC<Props> = ({ camera }) => {
  return (
    <div>
      <iframe
        src={camera.link}
        width="100%"
        height="500px"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default CameraInfo;
