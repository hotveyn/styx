import { BellOutlined } from "@ant-design/icons";
import { Button, Tooltip, notification } from "antd";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import queryKeys from "../../../constants/queryKeys";
import api from "../../../pages/Login/api";

const UserNotification: FC = () => {
  const { t } = useTranslation();

  const [refetchOnWindowFocus, setRefetchOnWindowFocus] = useState(false);

  const { data: telegramLink } = useQuery({
    queryKey: [queryKeys.getTelegramLink],
    queryFn: () => api.getTelegramLink(),
    onError: () => {
      notification.error({
        message: t("telegram.queries.get.error"),
      });
    },
  });

  const { data: userNotification } = useQuery({
    queryKey: [queryKeys.getUserNotification],
    queryFn: () => api.getUserNotification(),
    onSuccess: () => {
      setRefetchOnWindowFocus(false);
    },
    refetchOnWindowFocus,
    cacheTime: 0,
    staleTime: 0,
  });

  return telegramLink && !userNotification ? (
    <Tooltip title={t("telegram.tooltipText")}>
      <Button
        icon={<BellOutlined />}
        href={telegramLink.link}
        target="_blank"
        onClick={() => setRefetchOnWindowFocus(true)}
      ></Button>
    </Tooltip>
  ) : (
    <></>
  );
};

export default UserNotification;
