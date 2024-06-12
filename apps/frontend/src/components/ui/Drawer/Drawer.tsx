import { Drawer as DrawerComponent } from "antd";
import { IDrawer } from "../../../types/common";

const Drawer = ({
  width,
  setIsVisible,
  title,
  children,
  isVisible,
}: IDrawer) => {
  const handleCancel = () => {
    setIsVisible && setIsVisible(false);
  };

  return (
    <DrawerComponent
      destroyOnClose
      title={title}
      open={isVisible}
      onClose={handleCancel}
      footer={null}
      width={width || 600}
    >
      {children}
    </DrawerComponent>
  );
};

export default Drawer;
