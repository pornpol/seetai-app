import { useNavigate } from "@remix-run/react";

import Blade from "~/components/shared/blade";

type Props = {
  item: any;
};

const OrderItemRow: React.FC<Props> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <tr onClick={() => navigate(`/orders/${item.id}`)}>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <img
              className="w-full h-full rounded-full"
              src={item.images[0]}
              alt={item.seq}
            />
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap"># {item.seq}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">{item.user.name}</p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">{item.customer.name}</p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">{item.createdAt}</p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <Blade status={item.status} />
      </td>
    </tr>
  );
};

export default OrderItemRow;
