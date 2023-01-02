import { useState } from "react";

import { BsGrid, BsList, BsSearch, BsThreeDotsVertical } from "react-icons/bs";

import OrderItemRow from "./item/row";
import OrderItemGrid from "./item/grid";
import { useNavigate } from "@remix-run/react";
import { Dropdown } from "flowbite-react";

enum DisplayStyle {
  ROW = "row",
  GRID = "grid",
}

type Props = {
  orders: any[]; // FIXME:
};

const OrderList: React.FC<Props> = ({ orders }) => {
  const displayStyle: DisplayStyle = DisplayStyle.GRID;
  const [style, setStyle] = useState<DisplayStyle>(displayStyle);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const navigate = useNavigate();

  return (
    <div>
      {/* component */}
      {/* <div className="w-full p-8 bg-white rounded-md"> */}
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div className="w-full">
          {/* <h2 className="font-semibold text-gray-600">Orders</h2>
          <span className="text-xs">All orders</span> */}
        </div>
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="flex items-center w-full p-2 rounded-m">
            <BsSearch className="w-4 h-4 text-gray-400" />
            <input
              className="block ml-2 rounded-lg outline-none"
              type="text"
              name="search"
              id="search"
              placeholder="search..."
            />
          </div>
          <div className="flex w-full ml-5 space-x-8 lg:ml-20">
            <button
              className="px-4 py-2 font-semibold tracking-wide text-white bg-indigo-600 rounded-md cursor-pointer"
              onClick={() => {
                console.log("create order");
                navigate("/orders/new");
              }}
            >
              สร้าง
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="px-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div className="flex justify-between my-2">
            <div className="inline-flex px-4 py-2 my-auto border border-gray-200 rounded-lg">
              {/* <BsThreeDotsVertical className="h-full text-gray-400" /> */}
              <Dropdown
                label="Actions"
                // dismissOnClick={false}
                inline={true}
                size="sm"
              >
                <Dropdown.Item>ผลิตอีกครั้ง</Dropdown.Item>
                <Dropdown.Item>ลบรายการ</Dropdown.Item>
                <Dropdown.Item>สร้างใบสั่งงาน</Dropdown.Item>
                <Dropdown.Item>สร้างใบแจ้งหนี้</Dropdown.Item>
              </Dropdown>
            </div>
            <div className="inline-flex items-center rounded-md shadow-sm">
              <button
                onClick={() => setStyle(DisplayStyle.GRID)}
                className="inline-flex items-center px-4 py-2 space-x-1 text-sm font-medium bg-white border rounded-l-lg text-slate-800 hover:text-blue-600 hover:bg-slate-100 border-slate-200"
              >
                <span>
                  <BsGrid />
                </span>
                <span>Grid</span>
              </button>
              <button
                onClick={() => setStyle(DisplayStyle.ROW)}
                className="inline-flex items-center px-4 py-2 space-x-1 text-sm font-medium bg-white border rounded-r-lg text-slate-800 hover:text-blue-600 hover:bg-slate-100 border-slate-200"
              >
                <span>
                  <BsList />
                </span>
                <span>Row</span>
              </button>
            </div>
          </div>
          {style === DisplayStyle.GRID && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
              {orders.map((item) => (
                <OrderItemGrid
                  key={item.id}
                  item={item}
                  checkedItems={checkedItems}
                  setCheckedItems={setCheckedItems}
                />
              ))}
            </div>
          )}
          {style === DisplayStyle.ROW && (
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 tracking-wider text-center bg-gray-100 border-b-2 border-gray-200"></th>
                    <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      Seq
                    </th>
                    <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      Saleperson
                    </th>
                    <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      Customer
                    </th>
                    <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      QRT
                    </th>
                    <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((item) => (
                    <OrderItemRow
                      key={item.id}
                      item={item}
                      checkedItems={checkedItems}
                      setCheckedItems={setCheckedItems}
                    />
                  ))}
                </tbody>
              </table>
              <div className="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between ">
                <span className="text-xs text-gray-900 xs:text-sm">
                  Showing 1 to 4 of 50 Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button className="px-4 py-2 text-sm font-semibold transition duration-150 bg-indigo-600 rounded-l text-indigo-50 hover:bg-indigo-500">
                    Prev
                  </button>
                  &nbsp; &nbsp;
                  <button className="px-4 py-2 text-sm font-semibold transition duration-150 bg-indigo-600 rounded-r text-indigo-50 hover:bg-indigo-500">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default OrderList;
