import { useLoaderData } from "@remix-run/react";
import OrderList from "~/components/order/list";
import { db } from "~/data/db.server";

export default function OrdersPage() {
  const { orders } = useLoaderData();

  return (
    <main>
      <OrderList orders={orders} />
    </main>
  );
}

export async function loader({ request }: { request: Request }) {
  const orders = await db.order.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
      customer: {
        select: {
          name: true,
        },
      },
    },
  });

  // console.log(orders);

  return { orders };
}
