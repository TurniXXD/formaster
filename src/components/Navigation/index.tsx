"use client";

import styles from "./navigation.module.scss";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

const createLinksArray = (t: any, locale: string) => {
  return [
    {
      title: t("availableForms"),
      path: `/${locale}/`,
    },
    {
      title: t("formBuilder"),
      path: `/${locale}/form-builder/`,
    },
    {
      title: t("formTester"),
      path: `/${locale}/form-tester/`,
    },
  ];
};

export default function Navigation() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const locale = useLocale();
  const links = createLinksArray(t, locale);

  return (
    <div className={styles.navigation}>
      {links.map((link, i) => (
        <Link
          key={i}
          href={link.path}
          className={pathname === link.path ? styles.active : ""}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
}
