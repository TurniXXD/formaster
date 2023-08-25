import { useTranslations } from "next-intl";
import styles from "./form-tester.module.scss";

export default function FormTester() {
  const t = useTranslations("common");

  return (
    <section className={styles.formTester}>hello, {t("formTester")}</section>
  );
}
