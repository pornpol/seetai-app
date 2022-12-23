import classNames from "classnames";

type Props = {
  item: any;
};

const OrderItemRow: React.FC<Props> = ({ item }) => {
  const statusClasses = classNames(
    "absolute inset-0 rounded-full opacity-50",
    {
      "bg-green-200": item.status === "delivered",
    },
    {
      "bg-yellow-200": item.status === "pending",
    },
    {
      "bg-red-200": item.status === "cancelled",
    }
  );

  return (
    <tr>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <img
              className="w-full h-full rounded-full"
              src={item.image}
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">{item.name}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">Admin</p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">Jan 21, 2020</p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">43</p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
          <span aria-hidden className={statusClasses} />
          <span className="relative">{item.status}</span>
        </span>
      </td>
    </tr>
  );
};

export default OrderItemRow;
