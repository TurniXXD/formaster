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
import { ELangs, ERoutesPaths, TForms } from "@/types";
import { useEffect, useState } from "react";
import { NotFound } from "../NotFound";
import Loader from "../UI/Loader";

export default function FormTesterList() {
  const t = useTranslations("formTester");
  const tCommon = useTranslations("common");
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
        <Link
          key={i}
          href={`${ERoutesPaths.formTester}${form.id}`}
          data-testid={form.id}
        >
          <Card className={styles.formCard}>
            <Title>{locale === ELangs.cs ? form.csTitle : form.enTitle}</Title>
            <div className={styles.formProperties}>
              <div>
                <span>{t("questionsCount")}:</span>
                <span data-testid={`${form.id}-fields-count`}>
                  {form.fields.length}
                </span>
              </div>
              <div>
                <span>{tCommon("form.createdAt")}:</span>
                <span data-testid={`${form.id}-created-at`}>
                  {formatDateTime(form.createdAt)}
                </span>
              </div>
              <div>
                <span>{tCommon("form.updatedAt")}:</span>
                <span data-testid={`${form.id}-updated-at`}>
                  {formatDateTime(form.updatedAt)}
                </span>
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
