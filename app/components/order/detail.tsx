type Props = {
  item: {
    seq: string;
  }; // FIXME:
};

const OrderDetail: React.FC<Props> = ({ item }) => {
  return (
    <div className="w-full p-8 bg-white rounded-md">
      <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
        Order # {item.seq}
      </div>
    </div>
  );
};

export default OrderDetail;
