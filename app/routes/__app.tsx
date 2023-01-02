import { Layout } from "~/components/layout3";
import { Outlet, useLoaderData } from "@remix-run/react";
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
