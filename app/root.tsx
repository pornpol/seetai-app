import type { MetaFunction, LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";

import styles from "./tailwind.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "SEEATAI DIAMOND App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
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

// export function CatchBoundary() {
//   const caughtResponse = useCatch();

//   return (
//     <></>
//     // <Document title={caughtResponse.statusText}>
//     //   <main>
//     //     <Error title={caughtResponse.statusText}>
//     //       <p>
//     //         {caughtResponse.data?.message ||
//     //           "Something went wrong. Please try again later."}
//     //       </p>
//     //       <p>
//     //         Back to <Link to="/">safety</Link>.
//     //       </p>
//     //     </Error>
//     //   </main>
//     // </Document>
//   );
// }

// export function ErrorBoundary({ error }: { error: Error }) {
//   return (
//     <></>
//     // <Document title="An error occurred">
//     //   <main>
//     //     <Error title="An error occurred">
//     //       <p>
//     //         {error.message || "Something went wrong. Please try again later."}
//     //       </p>
//     //       <p>
//     //         Back to <Link to="/">safety</Link>.
//     //       </p>
//     //     </Error>
//     //   </main>
//     // </Document>
//   );
// }

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
