import { redirect } from "@remix-run/node";
import { db } from "~/data/db.server";

export async function loader({
  request,
  params,
}: {
  request: Request;
  params: { id: string };
}) {
  const { id } = params;

  console.log("id", id);

  const item = await db.order.findUnique({
    where: {
      seq: +id,
    },
  });

  return redirect(`/orders/${item?.id}`);
}

export default function OrderSeq() {
  return null;
}
