import { languageSelect } from "@/constants";
import { ELangs } from "@/types";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";

export default function LangSelect({ locale }: { locale: string }) {
  const t = useTranslations("common");

  if (locale === ELangs.cs) {
    return (
      <Link href="/" locale={ELangs.en}>
        {languageSelect[ELangs.en]}
      </Link>
    );
  }

  return (
    <Link href="/" locale={ELangs.cs}>
        {languageSelect[ELangs.cs]}
    </Link>
  );
}
