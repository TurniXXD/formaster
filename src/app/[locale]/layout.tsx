import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { useLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import styles from "./layout.module.scss";
import UpperBar from "@/components/UpperBar";
import { Card } from "@/components/Card";
import Sidebar from "@/components/Sidebar";

const font = Montserrat({ subsets: ["latin"], weight: "400", display: "swap" });

export const metadata: Metadata = {
  title: "Formaster",
  description: "Build your own forms",
};

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: any;
}) {
  const locale = useLocale();

  // todo: from auth
  let isAuthenticated = true;

  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html lang={locale} className={font.className}>
      <body className={styles.body}>
        <div
          className={`${styles.layout} ${
            !isAuthenticated && styles.hideSidebarCol
          }`}
        >
          {isAuthenticated && <Sidebar className={styles.sidebar} />}
          <UpperBar
            className={styles.upperBar}
            showTitle={!isAuthenticated}
            locale={locale}
          />
          <div
            className={`${styles.childrenWrapper} ${
              !isAuthenticated && styles.loginCardWrapper
            }`}
          >
            <Card className={styles.children}>{children}</Card>
          </div>
        </div>
      </body>
    </html>
  );
}
