import Carousel from "../shared/carousel";

type Props = {
  item: any; // FIXME:
};

const OrderDetail: React.FC<Props> = ({ item }) => {
  return (
    <div className="w-full p-8 bg-white rounded-md">
      <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
        <div className="p-4 px-4 mb-6 bg-white rounded shadow-lg md:p-8">
          <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3">
            <div className="text-gray-600">
              <p className="mb-4 text-lg font-medium">Order # {item.seq}</p>
              {/* <img src={item.images[0]} alt={item.seq}></img> */}
              <Carousel images={item.images} />
            </div>
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-5">
                <div className="md:col-span-5">
                  <label htmlFor="full_name">Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    id="full_name"
                    className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                    // defaultValue
                  />
                </div>
                <div className="md:col-span-5">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                    // defaultValue
                    placeholder="email@domain.com"
                  />
                </div>
                <div className="md:col-span-3">
                  <label htmlFor="address">Address / Street</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                    // defaultValue
                    // placeholder
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                    // defaultValue
                    // placeholder
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="country">Country / region</label>
                  <div className="flex items-center h-10 mt-1 border border-gray-200 rounded bg-gray-50">
                    <input
                      name="country"
                      id="country"
                      placeholder="Country"
                      className="w-full px-4 text-gray-800 bg-transparent outline-none appearance-none"
                      // defaultValue
                    />
                    <button
                      tabIndex={-1}
                      className="text-gray-300 transition-all outline-none cursor-pointer focus:outline-none hover:text-red-600"
                    >
                      <svg
                        className="w-4 h-4 mx-2 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1={18} y1={6} x2={6} y2={18} />
                        <line x1={6} y1={6} x2={18} y2={18} />
                      </svg>
                    </button>
                    <button
                      tabIndex={-1}
                      // htmlFor="show_more"
                      className="text-gray-300 transition-all border-l border-gray-200 outline-none cursor-pointer focus:outline-none hover:text-blue-600"
                    >
                      <svg
                        className="w-4 h-4 mx-2 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="18 15 12 9 6 15" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="state">State / province</label>
                  <div className="flex items-center h-10 mt-1 border border-gray-200 rounded bg-gray-50">
                    <input
                      name="state"
                      id="state"
                      placeholder="State"
                      className="w-full px-4 text-gray-800 bg-transparent outline-none appearance-none"
                      // defaultValue
                    />
                    <button
                      tabIndex={-1}
                      className="text-gray-300 transition-all outline-none cursor-pointer focus:outline-none hover:text-red-600"
                    >
                      <svg
                        className="w-4 h-4 mx-2 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1={18} y1={6} x2={6} y2={18} />
                        <line x1={6} y1={6} x2={18} y2={18} />
                      </svg>
                    </button>
                    <button
                      tabIndex={-1}
                      // htmlFor="show_more"
                      className="text-gray-300 transition-all border-l border-gray-200 outline-none cursor-pointer focus:outline-none hover:text-blue-600"
                    >
                      <svg
                        className="w-4 h-4 mx-2 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="18 15 12 9 6 15" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="md:col-span-1">
                  <label htmlFor="zipcode">Zipcode</label>
                  <input
                    type="text"
                    name="zipcode"
                    id="zipcode"
                    className="flex items-center w-full h-10 px-4 mt-1 transition-all border rounded bg-gray-50"
                    // placeholder
                    // defaultValue
                  />
                </div>
                <div className="md:col-span-5">
                  <div className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="billing_same"
                      id="billing_same"
                      className="form-checkbox"
                    />
                    <label htmlFor="billing_same" className="ml-2">
                      My billing address is different than above.
                    </label>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="soda">How many soda pops?</label>
                  <div className="flex items-center h-10 mt-1 border border-gray-200 rounded w-28 bg-gray-50">
                    <button
                      tabIndex={-1}
                      // htmlFor="show_more"
                      className="text-gray-500 transition-all border-r border-gray-200 outline-none cursor-pointer focus:outline-none hover:text-blue-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 mx-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <input
                      name="soda"
                      id="soda"
                      // placeholder={0}
                      className="w-full px-2 text-center text-gray-800 bg-transparent outline-none appearance-none"
                      // defaultValue={0}
                    />
                    <button
                      tabIndex={-1}
                      // htmlFor="show_more"
                      className="text-gray-500 transition-all border-l border-gray-200 outline-none cursor-pointer focus:outline-none hover:text-blue-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 mx-2 fill-current"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="text-right md:col-span-5">
                  <div className="inline-flex items-end">
                    <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
