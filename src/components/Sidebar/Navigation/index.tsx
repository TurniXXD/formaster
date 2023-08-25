import styles from "./navigation.module.scss";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";

export default function Navigation() {
  const t = useTranslations("common");

  return (
    <div className={styles.navigation}>
      <Link href="/">{t("dashboard")}</Link>
      <Link href="/form-builder">{t("formBuilder")}</Link>
      <Link href="/form-tester">{t("formTester")}</Link>
    </div>
  );
}
