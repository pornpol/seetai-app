type Props = {
  order: {
    id: string;
  }; // FIXME:
};

const OrderDetail: React.FC<Props> = ({ order }) => {
  return (
    <main>
      <h1>Order {order.id}</h1>
    </main>
  );
};

export default OrderDetail;
