"use client";

import { ERoutesPaths } from "@/types";
import styles from "./navigation.module.scss";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

const createLinksArray = (t: any) => [
  {
    title: t("availableForms"),
    path: ERoutesPaths.root,
  },
  {
    title: t("formBuilder"),
    path: ERoutesPaths.formBuilder,
  },
  {
    title: t("formTester"),
    path: ERoutesPaths.formTester,
  },
];

export default function Navigation() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const locale = useLocale();
  const links = createLinksArray(t);

  return (
    <div className={styles.navigation}>
      {links.map((link, i) => {
        const pathnameMatched = pathname?.match(/^\/[^/]+\/([^/]+)(?:\/|$)/);
        const pathnameParsed =
          pathnameMatched && pathnameMatched[1]
            ? `/${pathnameMatched[1]}/`
            : "/";
        const isActiveLink = pathnameParsed === link.path;

        return (
          <Link
            key={i}
            href={`/${locale}${link.path}`}
            className={isActiveLink ? styles.active : ""}
            data-testid={link.path}
          >
            {link.title}
          </Link>
        );
      })}
    </div>
  );
}
