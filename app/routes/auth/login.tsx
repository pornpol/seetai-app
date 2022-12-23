import type { ActionArgs, ErrorBoundaryComponent } from "@remix-run/node";

import { login } from "~/data/auth.server";
import LoginForm from "~/components/loginForm";

export default function LoginPage() {
  return <LoginForm />;
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData) as {
    name: string;
    password: string;
  };

  // try {
  //   validateCredentials(credentials);
  // } catch (error) {
  //   return error;
  // }

  try {
    return await login(credentials);
  } catch (error: any) {
    if (error.status === 422) {
      return { credentials: error.message };
    }
    if (error.status === 401) {
      return { credentials: error.message };
    }
  }
}
