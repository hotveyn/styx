import { FC } from "react";
import { useTranslation } from "react-i18next";
import { getNavLabels } from "../../constants/common";
import useSetPageTitle from "../../hooks/useSetPageTitle";

const Docs: FC = () => {
  const { t } = useTranslation();
  useSetPageTitle(getNavLabels(t).docs);
  return <div>Docs</div>;
};

export default Docs;
