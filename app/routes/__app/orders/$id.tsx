import { useLoaderData } from "@remix-run/react";
import OrderDetail, {
  links as orderDetailLink,
} from "~/components/order/detail";
import { db } from "~/data/db.server";

export default function OrderPage() {
  const { item } = useLoaderData();

  return (
    <main>
      <OrderDetail item={item} />
    </main>
  );
}

export async function loader({
  request,
  params,
}: {
  request: Request;
  params: { id: string };
}) {
  const { id } = params;

  const item = await db.order.findUnique({
    where: {
      id: id as string,
    },
  });

  return { item };
}

export function links() {
  return [...orderDetailLink()];
}
