import { useTranslations } from "next-intl";
import styles from "./form-builder.module.scss";

export default function FormBuilder() {
  const t = useTranslations("common");

  return (
    <section className={styles.formBuilder}>
      <div>hello, {t("formBuilder")}</div>
    </section>
  );
}
