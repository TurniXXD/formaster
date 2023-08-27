import { useTranslations } from "next-intl";
import styles from "./form-tester-list.module.scss";

export default function FormTesterPage() {
  const t = useTranslations("common");

  return (
    <section className={styles.formTester}>
      hello, {t("formTester")}, cards as forms for selection
    </section>
  );
}
