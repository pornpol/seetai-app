import { Form } from "@remix-run/react";
import { useState, useRef } from "react";
import ImageGallery from "react-image-gallery";
import styles from "react-image-gallery/styles/css/image-gallery.css";
// import { Listbox, Disclosure } from "@headlessui/react";
// import { BsChevronUp } from "react-icons/bs";
import Disclosure from "~/components/shared/disclosure";

import Camera from "~/components/shared/camera";
import { useTranslation } from "react-i18next";

type Props = {
  item: any; // FIXME:
  sales: any; // FIXME:
  customers: any; // FIXME:
};

const OrderDetail: React.FC<Props> = ({ item, sales, customers }) => {
  const [showCamera, setShowCamera] = useState<boolean>(false);

  const [currentImages, setCurrentImages] = useState<string[]>(item.images);
  const [tempImages, setTempImages] = useState<string[]>([]);

  const refImg = useRef<any>(null);

  let { t } = useTranslation(["order", "common"]);

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
      <p className="mb-4 text-lg font-medium">
        {`${t("order", { ns: "order" })} # ${item.seq}`}
      </p>
      <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3">
        <div className="p-4 text-gray-600 rounded-lg shadow">
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
              {t("add", { ns: "common" })}
            </button>
            <button
              onClick={handleRemoveImage}
              className="w-24 px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
            >
              {t("delete", { ns: "common" })}
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

            <div className="flex flex-col p-4 mt-4 space-y-4 rounded-lg shadow lg:mt-0">
              <Disclosure topic={t("orderDetail", { ns: "order" })}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <div className="md:col-span-4">
                    <label htmlFor="description">
                      {t("description", { ns: "order" })}
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      className="w-full h-10 px-4 mt-1 border rounded"
                      defaultValue={item.description}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="sale">
                      {t("saleperson", { ns: "order" })}
                    </label>
                    <select
                      name="userId"
                      id="userId"
                      className="w-full h-10 px-4 mt-1 border rounded "
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
                    <label htmlFor="customer">
                      {t("customer", { ns: "order" })}
                    </label>
                    <select
                      name="customerId"
                      id="customerId"
                      className="w-full h-10 px-4 mt-1 border rounded "
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
                </div>
              </Disclosure>

              <Disclosure topic={t("gold", { ns: "order" })}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <div className="md:col-span-4">
                    <label htmlFor="description">
                      {t("note", { ns: "order" })}
                    </label>
                    <input
                      type="text"
                      name="goldNote"
                      id="goldNote"
                      className="w-full h-10 px-4 mt-1 border rounded "
                      defaultValue={item.goldNote}
                    />
                  </div>
                </div>
              </Disclosure>

              <Disclosure topic={t("diamond", { ns: "order" })}>
                <div className="md:col-span-4">
                  <label htmlFor="description">
                    {t("note", { ns: "order" })}
                  </label>
                  <input
                    type="text"
                    name="diamondNote"
                    id="diamondNote"
                    className="w-full h-10 px-4 mt-1 border rounded "
                    defaultValue={item.diamondNote}
                  />
                </div>
              </Disclosure>

              <Disclosure topic={t("factoryList", { ns: "order" })}>
                <div className="md:col-span-4">
                  <label htmlFor="description">
                    {t("note", { ns: "order" })}
                  </label>
                  <input
                    type="text"
                    name="factoryListNote"
                    id="factoryListNote"
                    className="w-full h-10 px-4 mt-1 border rounded "
                    defaultValue={item.factoryListNote}
                  />
                </div>
              </Disclosure>

              <Disclosure topic={t("factoryCost", { ns: "order" })}>
                <div className="md:col-span-4">
                  <label htmlFor="description">
                    {t("note", { ns: "order" })}
                  </label>
                  <input
                    type="text"
                    name="factoryCostNote"
                    id="factoryCostNote"
                    className="w-full h-10 px-4 mt-1 border rounded "
                    defaultValue={item.factoryCostNote}
                  />
                </div>
              </Disclosure>

              <div className="mt-6 text-right md:col-span-4">
                <div className="inline-flex items-end">
                  <button
                    type="submit"
                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                  >
                    {t("save", { ns: "common" })}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
