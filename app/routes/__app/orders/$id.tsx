import { useParams } from "@remix-run/react";
import OrderDetail from "~/components/order/detail";

export default function OrderPage() {
  const { id } = useParams();

  // FIXME:
  const order = {
    id: id as string,
  };

  return (
    <main>
      <OrderDetail order={order} />
    </main>
  );
}
