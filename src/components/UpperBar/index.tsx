"use client";

import Title, { ETitleSize } from "../UI/Title";
import LangSelect from "./LangSelect";
import styles from "./upper-bar.module.scss";
import { useTranslations } from "next-intl";
import { Card } from "../UI/Card";
import { Menu, X } from "react-feather";
import { useEffect, useState } from "react";
import { useMedia } from "react-use";
import Navigation from "../Navigation";
import LogoutButton from "./LogoutButton";
import { md } from "@/constants";
import { usePathname } from "next-intl/client";

export default function UpperBar({
  isAuthenticated,
  locale,
  className,
}: {
  isAuthenticated: boolean;
  locale: string;
  className: string;
}) {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const t = useTranslations("common");
  const isMobile = useMedia(`(max-width: ${md}px)`, false);
  const pathname = usePathname();

  useEffect(() => {
    !isMobile && setOpenMobileMenu(false);
  }, [isMobile]);

  useEffect(() => {
    setOpenMobileMenu(false);
  }, [pathname]);

  return (
    <Card className={`${styles.upperBar} ${className || ""}`}>
      <div
        className={`${styles.upperBarContent} ${
          !isAuthenticated || isMobile ? styles.withTitle : ""
        }`}
      >
        {(!isAuthenticated || isMobile) && (
          <Title size={ETitleSize.lg}>{t("title")}</Title>
        )}
        <div className={styles.actionArea}>
          <LangSelect locale={locale} pathname={pathname} />
          {isMobile && isAuthenticated ? (
            openMobileMenu ? (
              <X
                onClick={() => setOpenMobileMenu((val) => !val)}
                className={styles.mobileMenuButton}
              />
            ) : (
              <Menu
                onClick={() => setOpenMobileMenu((val) => !val)}
                className={styles.mobileMenuButton}
              />
            )
          ) : (
            isAuthenticated && <LogoutButton label={t("logoutButton")} />
          )}
        </div>
      </div>
      {openMobileMenu && (
        <div className={styles.mobileMenu}>
          <div>
            <Navigation />
          </div>
          <div className={styles.mobileMenuLogout}>
            {isAuthenticated && <LogoutButton label={t("logoutButton")} />}
          </div>
        </div>
      )}
    </Card>
  );
}
