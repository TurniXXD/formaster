import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { useLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import styles from "./layout.module.scss";
import UpperBar from "@/components/UpperBar";
import Sidebar from "@/components/Sidebar";
import { getServerSession } from "next-auth";
import Providers from "@/components/Providers";

const font = Montserrat({ subsets: ["latin"], weight: "400", display: "swap" });

export const metadata: Metadata = {
  title: "Formaster",
  description: "Build your own forms",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: any;
}) {
  const locale = useLocale();
  const session = await getServerSession();

  if (params.locale !== locale) {
    notFound();
  }

  let translations;
  try {
    translations = (await import(`../../translations/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} className={font.className}>
      <body className={styles.body}>
        <Providers
          session={session}
          locale={params.locale}
          translations={translations}
        >
          <div
            className={`${styles.layout} ${!session && styles.hideSidebarCol}`}
          >
            {session && (
              <Sidebar className={styles.sidebar} session={session} />
            )}
            <UpperBar
              className={styles.upperBar}
              isAuthenticated={!!session}
              locale={locale}
            />
            <div className={styles.childrenWrapper}>{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
