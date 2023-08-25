import { useTranslations } from "next-intl";
import { Card } from "../Card";
import styles from "./sidebar.module.scss";
import Title from "../Title";
import Navigation from "./Navigation";

export default function Sidebar({ className }: { className: string }) {
  const t = useTranslations("common");

  return (
    <Card className={`${styles.sidebar} ${className || ""}`}>
      <Title>{t("title")}</Title>
      <Navigation />
    </Card>
  );
}
