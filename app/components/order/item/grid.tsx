import { Link } from "@remix-run/react";
import Blade from "~/components/shared/blade";

type Props = {
  item: any;
};

const OrderItemGrid: React.FC<Props> = ({ item }) => {
  return (
    <Link to={`/orders/${item.id}`}>
      <div className="p-4 rounded-lg shadow lg:flex hover:shadow-lg">
        <img
          className="object-cover w-full h-56 rounded-lg lg:w-48 lg:h-48"
          src={item.images.at(-1)}
          alt="Article"
        />
        <div className="flex flex-col justify-between py-6 lg:mx-6">
          <span className="text-xl font-semibold text-gray-800">
            # {item.seq}
          </span>
          <span className="text-sm text-gray-500">
            Saleperson: {item.user.name}
          </span>
          <span className="text-sm text-gray-500">
            Customer: {item.customer.name}
          </span>
          <span className="text-sm text-gray-500">
            Status:
            <Blade className="ml-2" status={item.status} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default OrderItemGrid;
