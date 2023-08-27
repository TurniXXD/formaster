import { ELangs } from "@/types";
import Link from "next-intl/link";
import { CzechFlag, EnglishFlag } from "@/components/UI/Icons";

export default function LangSelect({ locale }: { locale: string }) {
  if (locale === ELangs.cs) {
    return (
      <Link href="/" locale={ELangs.en}>
        <EnglishFlag />
      </Link>
    );
  }

  return (
    <Link href="/" locale={ELangs.cs}>
      <CzechFlag />
    </Link>
  );
}
