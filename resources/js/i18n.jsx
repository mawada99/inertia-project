import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import config from "./config.json";

// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init
const Languages = config.app.languages;

const path = config.app.basePath.length === 1 ? "" : config.app.basePath;

localStorage.setItem(
    "i18nextLng",
    localStorage.getItem("i18nextLng") ?? Languages[0]
);

i18n
    // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    .use(Backend)
    // detect user language
    .use(LanguageDetector)
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        fallbackLng: Languages,
        debug: false,
        whitelist: Languages,
        backend: {
            loadPath:
                `${path}/locales/{{lng}}/{{ns}}.json?cb=` +
                new Date().getTime(),
        },
    });

export default i18n;
