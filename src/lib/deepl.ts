import { ELangs } from "@/types";
import axios from "axios";

export const deeplTranslate = async (
  sourceLang: ELangs,
  targetLang: ELangs,
  value: string
) => {
  const response = await axios.post(
    "https://api-free.deepl.com/v2/translate",
    null,
    {
      params: {
        auth_key: process.env.DEEPL_AUTH_KEY,
        text: value,
        source_lang: sourceLang,
        target_lang: targetLang,
        tag_handling: "xml",
      },
    }
  );

  return response.data.translations[0].text;
};
