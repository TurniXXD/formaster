"use client";

import { useLocale, useTranslations } from "next-intl";
import styles from "./form-tester-list.module.scss";
import Title from "@/components/UI/Title";
import { resolveFormTitleTranslation } from "@/lib/forms";
import { formatDateTime } from "@/lib";
import Link from "next/link";
import { Card } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { ArrowRightCircle } from "react-feather";
import { ELocalStorageItems, useLocalStorage } from "@/lib/hooks";
import { Forms } from "@/types";

export default function FormTesterList() {
  const t = useTranslations("formTester");
  const locale = useLocale();
  const { value: forms } = useLocalStorage<Forms>(ELocalStorageItems.forms);

  return (
    <section className={styles.formTesterList}>
      {forms?.map((form, i) => (
        <Link key={i} href={`/form-tester/${form.id}`}>
          <Card className={styles.formCard}>
            <Title>
              {resolveFormTitleTranslation(form.title, locale)?.value}
            </Title>
            <div className={styles.formProperties}>
              <div>
                <span>{t("questionsCount")}:</span>
                <span>{form.fields.length}</span>
              </div>
              <div>
                <span>{t("createdAt")}:</span>
                <span>{formatDateTime(new Date(form.createdAt))}</span>
              </div>
              <div>
                <span>{t("updatedAt")}:</span>
                <span>{formatDateTime(new Date(form.updatedAt))}</span>
              </div>
            </div>
            <Button
              label={t("openForm")}
              icon={<ArrowRightCircle />}
              className={styles.openFormButton}
            />
          </Card>
        </Link>
      ))}
    </section>
  );
}
