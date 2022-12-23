type Props = {
  item: any;
};

const OrderItemGrid: React.FC<Props> = ({ item }) => {
  return (
    <div className="p-4 rounded-lg shadow lg:flex">
      <img
        className="object-cover w-full h-56 rounded-lg lg:w-48 lg:h-48"
        src={item.image}
        alt="Article"
      />
      <div className="flex flex-col justify-between py-6 lg:mx-6">
        <a
          href="/"
          className="text-xl font-semibold text-gray-800 hover:underline"
        >
          {item.name}
        </a>
        <span className="text-sm text-gray-500">Status: {item.status}</span>
      </div>
    </div>
  );
};

export default OrderItemGrid;
