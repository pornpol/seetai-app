import { useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";

export default function IndexPage() {
  let { t } = useTranslation();

  return <h1>{t("greeting")}</h1>;
}
