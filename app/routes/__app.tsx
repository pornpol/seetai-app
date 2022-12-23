import { Layout } from "~/components/layout2";
import { Links, Meta, Outlet, useLoaderData } from "@remix-run/react";
import { requireUserSession } from "~/data/auth.server";

export default function App() {
  const { user } = useLoaderData();
  return (
    <Layout user={user}>
      <Outlet />
    </Layout>
  );
}

export async function loader({ request }: { request: Request }) {
  const user = await requireUserSession(request);

  return { user };
}
