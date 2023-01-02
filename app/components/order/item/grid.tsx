import { Link } from "@remix-run/react";
import Blade from "~/components/shared/blade";

type Props = {
  item: any;
  checkedItems: string[];
  setCheckedItems: any;
};

const OrderItemGrid: React.FC<Props> = ({
  item,
  checkedItems,
  setCheckedItems,
}) => {
  return (
    <Link to={`/orders/${item.id}`}>
      <div className="p-4 rounded-lg shadow lg:flex hover:shadow-lg">
        <img
          className="object-cover w-full h-56 rounded-lg lg:w-48 lg:h-48"
          src={item.images.at(-1)}
          alt="Article"
        />
        <div className="flex flex-col justify-between w-full mt-2 lg:ml-6 lg:mt-0">
          <div className="flex flex-col mb-4">
            <div className="flex justify-between">
              <div className="text-xl font-semibold text-gray-800">
                # {item.seq}
              </div>
              <input
                type="checkbox"
                className="p-3"
                checked={checkedItems.includes(item.id)}
                onClick={(e) => {
                  e.stopPropagation();
                  if (checkedItems.includes(item.id)) {
                    setCheckedItems(
                      checkedItems.filter((id) => id !== item.id)
                    );
                  } else {
                    setCheckedItems([...checkedItems, item.id]);
                  }
                }}
              />
            </div>
            <div className="text-sm italic font-semibold text-gray-500 indent-5">
              {item.description}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">
              Sale: {item.customer.user.name}
            </span>
            <span className="text-sm text-gray-500">
              Cust: {item.customer.name}
            </span>
            <span className="text-sm text-gray-500">
              Status:
              <Blade className="ml-2" status={item.status} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderItemGrid;
