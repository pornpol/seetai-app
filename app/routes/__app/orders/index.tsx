import OrderList from "~/components/order/list";

// FIXME: This is a temporary solution to avoid the error:
const orders = [
  {
    id: "1",
    name: "Order 1",
    image: "./images/orders/order1.jpg",
    status: "delivered",
  },
  {
    id: "2",
    name: "Order 2",
    image: "./images/orders/order2.jpg",
    status: "pending",
  },
  {
    id: "3",
    name: "Order 3",
    image: "./images/orders/order3.jpg",
    status: "cancelled",
  },
  {
    id: "4",
    name: "Order 4",
    image: "./images/orders/order4.jpg",
    status: "delivered",
  },
  {
    id: "5",
    name: "Order 5",
    image: "./images/orders/order5.jpg",
    status: "cancelled",
  },
  {
    id: "6",
    name: "Order 6",
    image: "./images/orders/order6.jpg",
    status: "delivered",
  },
];

export default function OrdersPage() {
  return (
    <main>
      <OrderList orders={orders} />
    </main>
  );
}
