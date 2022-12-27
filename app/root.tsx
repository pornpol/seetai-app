import type { MetaFunction, LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { useEffect } from "react";
// import { useChangeLanguage } from "remix-i18next";
import { useTranslation } from "react-i18next";
import i18next from "~/i18next.server";

import styles from "./tailwind.css";

export const loader = async ({ request }: LoaderArgs) => {
  // let locale = await i18next.getLocale(request);

  // FIXME: This is temporary until we have a better way to change the
  return json({ locale: "th" });
};

export const handle = {
  // In the handle export, we could add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  i18n: ["common", "order"],
};

// FIXME: This hook is temporary until we have a better way to change the
export function useChangeLanguage(locale: string) {
  let { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "SEEATAI DIAMOND App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  // Get the locale from the loader
  let { locale } = useLoaderData<typeof loader>();

  let { i18n } = useTranslation();

  // console.log("locale", locale);

  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
