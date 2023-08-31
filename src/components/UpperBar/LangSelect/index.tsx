import { ELangs } from "@/types";
import Link from "next-intl/link";
import { CzechFlag, EnglishFlag } from "@/components/UI/Icons";

export default function LangSelect({
  locale,
  pathname,
}: {
  locale: string;
  pathname: string;
}) {
  if (locale === ELangs.cs) {
    return (
      <Link href={pathname} locale={ELangs.en}>
        <EnglishFlag />
      </Link>
    );
  }

  return (
    <Link href={pathname} locale={ELangs.cs}>
      <CzechFlag />
    </Link>
  );
}
