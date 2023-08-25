import Title from "../Title";
import LangSelect from "./LangSelect";
import styles from "./upper-bar.module.scss";
import { useTranslations } from "next-intl";
import { Card } from "../Card";

export default function UpperBar({
  showTitle,
  locale,
  className,
}: {
  showTitle: boolean;
  locale: string;
  className: string;
}) {
  const t = useTranslations("common");

  return (
    <Card
      className={`${styles.upperBar} ${showTitle ? styles.withTitle : ""} ${
        className || ""
      }`}
    >
      {showTitle && <Title>{t("title")}</Title>}
      <div className={styles.actionArea}>
        <LangSelect locale={locale} />
        <div>mobile menu</div>
      </div>
    </Card>
  );
}
