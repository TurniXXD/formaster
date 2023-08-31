"use client";

import DataTable from "@/components/DataTable/DataTable";
import { formatDateTime } from "@/lib";
import { ELocalStorageItems, useLocalStorage } from "@/lib/hooks";
import { ELangs, TForms } from "@/types";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

export default function FormsList({ forms: formsLoaded }: { forms: TForms }) {
  const locale = useLocale();
  const t = useTranslations("common");
  const { setValue } = useLocalStorage<TForms>(ELocalStorageItems.forms);
  const [forms, setForms] = useState(formsLoaded);
  const data = forms.map((form) => {
    return [
      form.id,
      locale === ELangs.cs ? form.csTitle : form.enTitle,
      form.fields.length.toString(),
      formatDateTime(form.createdAt),
      formatDateTime(form.updatedAt),
    ];
  });

  const deleteHandler = (id: string) => {
    const updatedForms = forms.filter((form) => form.id !== id);
    setForms(updatedForms);
    setValue(updatedForms);
  };

  return (
    <DataTable
      headers={[
        t("form.title"),
        t("form.questionsCount"),
        t("form.createdAt"),
        t("form.updatedAt"),
      ]}
      data={data}
      editPathname={"/form-builder/"}
      editQueryParamName={"editFormId"}
      deleteHandler={deleteHandler}
    />
  );
}
