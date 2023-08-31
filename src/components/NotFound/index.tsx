import { AlertCircle } from "react-feather";
import { Card } from "../UI/Card";
import Title from "../UI/Title";
import styles from "./not-found.module.scss";
import { useTranslations } from "next-intl";

export const NotFound = () => {
  const t = useTranslations("common");

  return (
    <Card className={styles.notFound}>
      <AlertCircle />
      <Title>{t("nothingFound")}</Title>
    </Card>
  );
};
