import { Form } from "@remix-run/react";
import { useState, useRef, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import styles from "react-image-gallery/styles/css/image-gallery.css";
import { Listbox, Disclosure } from "@headlessui/react";
import { BsChevronUp } from "react-icons/bs";

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
          <p className="mb-4 text-lg font-medium">Order # {item.seq}</p>
          <div className="grid grid-cols-1 gap-8 text-sm gap-y-2 lg:grid-cols-3">
            <div className="text-gray-600">
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

                <div className="flex flex-col mt-4 space-y-4 lg:mt-0">
                  <Disclosure defaultOpen>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                          <span>Information</span>
                          <BsChevronUp
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-gray-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pb-2 text-sm">
                          <div className="md:col-span-4">
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
                          <div className="md:col-span-2">
                            <label htmlFor="customer">Customer</label>
                            <select
                              name="customerId"
                              id="customerId"
                              className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                              defaultValue={item.customerId}
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
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>

                  {/* Gold */}
                  <Disclosure defaultOpen>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                          <span>Gold</span>
                          <BsChevronUp
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-gray-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pb-2 text-sm ">
                          <div className="md:col-span-4">
                            <label htmlFor="description">Note</label>
                            <input
                              type="text"
                              name="goldNote"
                              id="goldNote"
                              className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                              defaultValue={item.goldNote}
                            />
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure defaultOpen>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                          <span>Diamond</span>
                          <BsChevronUp
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-gray-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pb-2 text-sm ">
                          <div className="md:col-span-4">
                            <label htmlFor="description">Note</label>
                            <input
                              type="text"
                              name="diamondNote"
                              id="diamondNote"
                              className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                              defaultValue={item.diamondNote}
                            />
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure defaultOpen>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                          <span>Factory (list)</span>
                          <BsChevronUp
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-gray-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pb-2 text-sm ">
                          <div className="md:col-span-4">
                            <label htmlFor="description">Note</label>
                            <input
                              type="text"
                              name="factoryListNote"
                              id="factoryListNote"
                              className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                              defaultValue={item.factoryListNote}
                            />
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure defaultOpen>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                          <span>Factory (cost)</span>
                          <BsChevronUp
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-gray-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pb-2 text-sm ">
                          <div className="md:col-span-4">
                            <label htmlFor="description">Note</label>
                            <input
                              type="text"
                              name="factoryCostNote"
                              id="factoryCostNote"
                              className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                              defaultValue={item.factoryCostNote}
                            />
                          </div>
                          <div className="mt-6 text-right md:col-span-4">
                            <div className="inline-flex items-end">
                              <button
                                type="submit"
                                className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
                {/* </div> */}
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
