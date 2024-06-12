import { TFunction } from "i18next";
import apiTranslationKeys from "../constants/apiTranslationKeys";

export const getApiErrorMessage = <T extends keyof typeof apiTranslationKeys>(
  t: TFunction<"translation">,
  errorThing?: T
) => {
  if (errorThing) {
    const translatedErrorMessage = t(apiTranslationKeys[errorThing]);

    return translatedErrorMessage;
  }

  return null;
};
