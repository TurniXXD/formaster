"use client";

import styles from "./navigation.module.scss";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

const createLinksArray = (t: any) => {
  return [
    {
      title: t("availableForms"),
      path: `/`,
    },
    {
      title: t("formBuilder"),
      path: `/form-builder/`,
    },
    {
      title: t("formTester"),
      path: `/form-tester/`,
    },
  ];
};

export default function Navigation() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const locale = useLocale();
  const links = createLinksArray(t);

  return (
    <div className={styles.navigation}>
      {links.map((link, i) => (
        <Link
          key={i}
          href={`/${locale}${link.path}`}
          className={
            pathname?.replace(/\/[a-f\d-]+\/$/, "/") === link.path
              ? styles.active
              : ""
          }
          data-testid={link.path}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
}
