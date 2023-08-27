import { useTranslations } from "next-intl";
import styles from "./sidebar.module.scss";
import Title, { ETitleSize } from "../UI/Title";
import Navigation from "../Navigation";
import { Card } from "../UI/Card";
import { Session } from "next-auth";
import Image from "next/image";

export default function Sidebar({
  className,
  session,
}: {
  className: string;
  session: Session | null;
}) {
  const t = useTranslations("common");

  return (
    <Card className={`${styles.sidebar} ${className || ""}`}>
      <Title size={ETitleSize.xl}>{t("title")}</Title>
      {session?.user && session.user.name && (
        <div className={styles.userCard}>
          {session.user.image && (
            <Image
              src={session.user.image}
              width={75}
              height={75}
              alt="User avatar"
            />
          )}
          <Title size={ETitleSize.lg}>{session.user.name}</Title>
        </div>
      )}
      <Navigation />
    </Card>
  );
}
