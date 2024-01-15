import { createI18n } from "vue-i18n";
import pluralRules from "./rules/pluralization"
import numberFormats from "./rules/numbers"
import datetimeFormats from "./rules/datetime"
import en from "./locales/en.json"

const i18n = createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  globalInjection: true,
  messages: { en },
  pluralRules,
  numberFormats,
  datetimeFormats,
  useScope: 'global',
})

// React to language changes
i18n.onLanguageChanged = (newLocale, oldLocale) => {
    console.log(`Language changed from ${oldLocale} to ${newLocale}`);
    // You can perform additional actions here if needed
};
export default i18n;
