import { Card, Statistic } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import monitoringTranslationKeys from "../../../constants/monitoringTranslationKeys";

interface Props {
  count: number;
  titleKey: keyof typeof monitoringTranslationKeys;
}

const MonitoringCard: FC<Props> = ({ count, titleKey }) => {
  const { t } = useTranslation();

  return (
    <Card
      title={t(monitoringTranslationKeys[titleKey])}
      style={{ textAlign: "center" }}
    >
      <Statistic
        value={count}
        style={{ textAlign: "center" }}
        groupSeparator=""
      />
    </Card>
  );
};

export default MonitoringCard;
