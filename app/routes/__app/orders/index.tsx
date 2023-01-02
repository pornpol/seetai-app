import { Link, useLoaderData } from "@remix-run/react";
import { Breadcrumb } from "flowbite-react";
import OrderList from "~/components/order/list";
import { db } from "~/data/db.server";

import { HiHome } from "react-icons/hi";
import { redirect } from "@remix-run/node";

export default function OrdersPage() {
  const { orders } = useLoaderData();

  return (
    <main>
      <Breadcrumb aria-label="Default breadcrumb example" className="mb-4">
        <Breadcrumb.Item icon={HiHome}>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/orders">Orders</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <OrderList orders={orders} />
    </main>
  );
}

export async function loader({ request }: { request: Request }) {
  // const url = new URL(request.url);
  // const seq = url.searchParams.get("seq");
  // console.log(seq);
  // if (seq) {
  //   const order = await db.order.findUnique({
  //     where: {
  //       seq: +seq,
  //     },
  //   });

  //   return redirect(`/orders/${order?.id}`);
  // }

  const orders = await db.order.findMany({
    include: {
      // user: {
      //   select: {
      //     name: true,
      //   },
      // },
      customer: {
        select: {
          name: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  // console.log(orders);

  return { orders };
}
