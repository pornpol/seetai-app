import { Layout } from "~/components/layout2";
import { Outlet } from "@remix-run/react";
export default function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
