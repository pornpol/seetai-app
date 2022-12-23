import { destroyUserSession } from "~/data/auth.server";

export function loader({ request }: { request: Request }) {
  return destroyUserSession(request);
}
