import { Link } from "@inertiajs/react";
import moment from "moment";
import "moment/locale/ar";
import "moment/locale/ku";
import { useTranslation } from "react-i18next";
import WebsiteHeader from "../Layout/WebsiteHeader";
import { ModeContext } from "../Context/ModeContext";
import { LANGUAGES_DETAILS } from "../LanguagesVariables";
import { Fragment, useContext, useEffect } from "react";

const languages = ["ar", "en", "ku"];
export default function Layout({ children }) {
    const { i18n } = useTranslation();

    document
        .getElementsByTagName("html")[0]
        .setAttribute("dir", i18n.language === "ku" ? "rtl" : i18n.dir());
    const Languages = languages;

    const { firstLoad } = useContext(ModeContext);

    useEffect(() => {
        const lang = LANGUAGES_DETAILS[i18n.language];
        document.body.style.fontFamily = `${lang.fontFamily}, sans-serif !important`;

        return () => {
            document.body.style.fontFamily = "";
        };
    }, [i18n.language]);

    moment.locale(
        localStorage.getItem("i18nextLng")
            ? localStorage.getItem("i18nextLng")
            : Languages[0]
    );
    return (
        <main>
            <header>
                {" "}
                <Fragment>
                    {console.log("wwwwwwwwwwwwwwwww")}
                    {/* Conditionally render WebsiteHeader */}
                    {document.location.pathname.startsWith("/admin") ? (
                        firstLoad && <WebsiteHeader />
                    ) : (
                        <WebsiteHeader />
                    )}
                    {/* Render the main app */}
                </Fragment>
            </header>
            {/* 
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
            </header> */}
            <article>{children}</article>
        </main>
    );
}
