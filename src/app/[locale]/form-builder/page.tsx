import { useTranslations } from "next-intl";
import styles from "./form-builder.module.scss";
import { Card } from "@/components/UI/Card";

export default function FormBuilderPage() {
  const t = useTranslations("common");

  // todo: get editFormId query param and load values

  return (
    <Card className={styles.formBuilder}>
      <div>hello, {t("formBuilder")}</div>
    </Card>
  );
}
