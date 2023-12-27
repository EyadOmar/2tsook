import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';

import arTrans from '../translations/ar/translation.json';
import enTrans from '../translations/en/translation.json';

const resources = {
  en: {
    translation: enTrans,
  },
  ar: {
    translation: arTrans,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    ns: 'translation',
    defaultNS: 'translation',
    detection: {
      order: ['path', 'cookie', 'htmlTag'],
      caches: ['cookie'],
    },
  });

export default i18n;
