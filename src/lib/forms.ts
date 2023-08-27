import { FormTitleTranslationObject } from "@/types";

export const resolveFormTitleTranslation = (
  titleTranslationObject: FormTitleTranslationObject,
  locale: string
) => {
  const translation = titleTranslationObject.find(
    (translation) => translation.locale === locale
  );
  return translation;
};