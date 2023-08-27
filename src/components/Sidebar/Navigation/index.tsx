"use client";

import { removeLocalePrefix } from "@/lib";
import styles from "./navigation.module.scss";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

const createLinksArray = (t: any) => {
  return [
    {
      title: t("availableForms"),
      path: "/",
    },
    {
      title: t("formBuilder"),
      path: "/form-builder/",
    },
    {
      title: t("formTester"),
      path: "/form-tester/",
    },
  ];
};

export default function Navigation() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const links = createLinksArray(t);

  return (
    <div className={styles.navigation}>
      {links.map((link, i) => (
        <Link
          key={i}
          href={link.path}
          className={
            removeLocalePrefix(pathname) === link.path ? styles.active : ""
          }
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
}
