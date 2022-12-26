import { Form } from "@remix-run/react";
import { useState, useRef, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import styles from "react-image-gallery/styles/css/image-gallery.css";
import { Listbox } from "@headlessui/react";

import Camera from "~/components/shared/camera";

type Props = {
  item: any; // FIXME:
  sales: any; // FIXME:
  customers: any; // FIXME:
};

const OrderDetail: React.FC<Props> = ({ item, sales, customers }) => {
  const [showCamera, setShowCamera] = useState<boolean>(false);

  const [currentImages, setCurrentImages] = useState<string[]>(item.images);
  const [tempImages, setTempImages] = useState<string[]>([]);
  // const [newItem, setNewItem] = useState<any>(item); // FIXME:

  const refImg = useRef<any>(null);

  // console.log(item);
  // console.log(sales);
  // console.log(customers);

  const handleAddImage = (image: any) => {
    setTempImages([...tempImages, image]);
  };

  const handleRemoveImage = () => {
    const currentImageLength = currentImages.length;
    const tempImageLength = tempImages.length;
    const totalLength = currentImageLength + tempImageLength;

    // reverse index because of react-image-gallery reverse image
    const currentIndex = totalLength - 1 - refImg?.current?.getCurrentIndex();

    if (currentIndex < currentImageLength) {
      setCurrentImages(
        currentImages.filter((_: any, index: any) => index !== currentIndex)
      );
    } else {
      setTempImages(
        tempImages.filter(
          (_, index) => index !== currentIndex - currentImageLength
        )
      );
    }
  };

  return (
    <div className="w-full p-8 bg-white rounded-md">
      <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
        <div className="p-4 px-4 mb-6 bg-white rounded shadow-lg md:p-8">
          <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3">
            <div className="text-gray-600">
              <p className="mb-4 text-lg font-medium">Order # {item.seq}</p>
              <ImageGallery
                ref={refImg}
                items={[...currentImages, ...tempImages]
                  .reverse()
                  .map((image: string) => ({
                    original: image,
                    // thumbnail: image,
                  }))}
                showBullets={true}
              />
              {
                <Camera
                  showCamera={showCamera}
                  setShowCamera={setShowCamera}
                  addImage={handleAddImage}
                />
              }
              <div className="flex justify-center mt-4 space-x-8">
                <button
                  onClick={() => setShowCamera(true)}
                  className="w-24 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                >
                  Add
                </button>
                <button
                  onClick={handleRemoveImage}
                  className="w-24 px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="lg:col-span-2">
              <Form method="post">
                <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-5">
                  <input
                    id="images"
                    name={"images"}
                    type="hidden"
                    value={currentImages}
                  />
                  <input
                    id="new_images"
                    name="new_images"
                    type="hidden"
                    value={tempImages}
                  />

                  <div className="mt-6 -mb-2 text-lg font-medium text-gray-600 lg:mt-0">
                    Information
                  </div>
                  <div className="md:col-span-5">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      defaultValue={item.description}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="sale">Saleperson</label>
                    <select
                      name="userId"
                      id="userId"
                      className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      defaultValue={item.userId}
                      // placeholder="email@domain.com"
                      // onChange={handleFormChange}
                    >
                      {sales.map((sale: any) => (
                        <option
                          key={sale.id}
                          value={sale.id}
                          disabled={!sale.active}
                        >
                          {sale.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-3">
                    <label htmlFor="customer">Customer</label>
                    <select
                      name="customerId"
                      id="customerId"
                      className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      defaultValue={item.customerId}
                      // placeholder="email@domain.com"
                      // onChange={handleFormChange}
                    >
                      {customers.map((cust: any) => (
                        <option
                          key={cust.id}
                          value={cust.id}
                          disabled={!cust.active}
                        >
                          {cust.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* <div className="mt-2 mb-1 border-2 border-b-gray-300 border-t-white md:col-span-5 round" /> */}

                  <div className="mt-6 -mb-2 text-lg font-medium text-gray-600">
                    Gold
                  </div>
                  <div className="md:col-span-5">
                    <label htmlFor="description">Note</label>
                    <input
                      type="text"
                      name="goldNote"
                      id="goldNote"
                      className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      defaultValue={item.goldNote}
                    />
                  </div>

                  {/* <div className="mt-1 border-2 border-b-gray-300 border-t-white md:col-span-5 round" /> */}

                  <div className="mt-6 -mb-2 text-lg font-medium text-gray-600">
                    Diamond
                  </div>
                  <div className="md:col-span-5">
                    <label htmlFor="description">Note</label>
                    <input
                      type="text"
                      name="diamondNote"
                      id="diamondNote"
                      className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      defaultValue={item.diamondNote}
                    />
                  </div>

                  <div className="mt-6 -mb-2 text-lg font-medium text-gray-600">
                    Factory (list)
                  </div>
                  <div className="md:col-span-5">
                    <label htmlFor="description">Note</label>
                    <input
                      type="text"
                      name="factoryListNote"
                      id="factoryListNote"
                      className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      defaultValue={item.factoryListNote}
                    />
                  </div>

                  <div className="mt-6 -mb-2 text-lg font-medium text-gray-600">
                    Factory (cost)
                  </div>
                  <div className="md:col-span-5">
                    <label htmlFor="description">Note</label>
                    <input
                      type="text"
                      name="factoryCostNote"
                      id="factoryCostNote"
                      className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      defaultValue={item.factoryCostNote}
                    />
                  </div>
                  {/* <div className="md:col-span-2">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      // defaultValue
                      // placeholder
                    />
                  </div> */}
                  {/* <div className="md:col-span-2">
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
                  </div> */}
                  <div className="mt-6 text-right md:col-span-5">
                    <div className="inline-flex items-end">
                      <button
                        type="submit"
                        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
