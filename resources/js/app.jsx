import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import withRoot from "./withRoot";
import ModeContextProvider from "./Context/ModeContext";
import moment from "moment";
import "moment/locale/ar";
import "moment/locale/ku";
const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<ModeContextProvider> {React.createElement(withRoot(App), props)}</ModeContextProvider>);
    },
    progress: {
        color: "#F87415",
    },
});
