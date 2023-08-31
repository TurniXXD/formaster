"use client";

import { useLocale, useTranslations } from "next-intl";
import styles from "./form-tester-list.module.scss";
import Title from "@/components/UI/Title";
import { formatDateTime } from "@/lib";
import Link from "next/link";
import { Card } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { ArrowRightCircle } from "react-feather";
import { ELocalStorageItems, useLocalStorage } from "@/lib/hooks";
import { ELangs, TForms } from "@/types";
import { useEffect, useState } from "react";
import { NotFound } from "../NotFound";
import Loader from "../UI/Loader";

export default function FormTesterList() {
  const t = useTranslations("formTester");
  const locale = useLocale();
  const { value: forms } = useLocalStorage<TForms>(ELocalStorageItems.forms);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [forms]);

  if (!isLoading && !forms) {
    return <NotFound />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={styles.formTesterList}>
      {forms?.map((form, i) => (
        <Link key={i} href={`/form-tester/${form.id}`}>
          <Card className={styles.formCard}>
            <Title>{locale === ELangs.cs ? form.csTitle : form.enTitle}</Title>
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
