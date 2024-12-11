import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Define the supported languages
const languages = ["ar", "en", "ku"];

i18n.use(Backend) // Load translations via http
    .use(LanguageDetector) // Detect user's language
    .use(initReactI18next) // Pass instance to react-i18next
    .init({
        fallbackLng: "en", // Fallback language
        supportedLngs: languages,
        debug: true, // Set false in production
        backend: {
            loadPath: "/locales/{{lng}}/translation.json", // Correct path to translations
        },
        interpolation: {
            escapeValue: false, // React already escapes output
        },
    });

export default i18n;
