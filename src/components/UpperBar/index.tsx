"use client";

import Title, { ETitleSize } from "../UI/Title";
import LangSelect from "./LangSelect";
import styles from "./upper-bar.module.scss";
import { useTranslations } from "next-intl";
import { Card } from "../UI/Card";
import { signOut } from "next-auth/react";
import { Button } from "../UI/Button";
import { Menu } from "react-feather";
import { useState } from "react";
import { useMedia } from "react-use";

export default function UpperBar({
  isAuthenticated,
  locale,
  className,
}: {
  isAuthenticated: boolean;
  locale: string;
  className: string;
}) {
  // todo: mobile menu
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const t = useTranslations("common");
  const isMobile = useMedia("(max-width: 768px)", false);

  return (
    <Card
      className={`${styles.upperBar} ${
        !isAuthenticated || isMobile ? styles.withTitle : ""
      } ${className || ""}`}
    >
      {(!isAuthenticated || isMobile) && (
        <Title size={ETitleSize.lg}>{t("title")}</Title>
      )}
      <div className={styles.actionArea}>
        {isMobile ? (
          <Menu
            onClick={() => setOpenMobileMenu((val) => !val)}
            className={styles.mobileMenuButton}
          />
        ) : (
          <>
            <LangSelect locale={locale} />
            {isAuthenticated && (
              <Button onClick={() => signOut()}>{t("logoutButton")}</Button>
            )}
          </>
        )}
      </div>
    </Card>
  );
}
