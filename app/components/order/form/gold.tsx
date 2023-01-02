import { useState } from "react";
import { useTranslation } from "react-i18next";
// import dayjs from "dayjs";
import { BsXCircle } from "react-icons/bs";
import DatePicker from "react-datepicker";

import styles from "react-datepicker/dist/react-datepicker.css";

import Disclosure from "~/components/shared/disclosure";
import Button from "~/components/shared/button";

import "react-datepicker/dist/react-datepicker.css";

type Props = {
  note: string;
};

const Gold: React.FC<Props> = ({ note }) => {
  const { t } = useTranslation(["order"]);
  const [goldItems, setGoldItems] = useState<string[]>([]);
  const [effDate, setEffDate] = useState<Date[]>([]);

  return (
    <Disclosure topic={t("gold")}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <p className="-mb-3">{t("goldItems")}</p>
        <div className="w-full p-4 pl-1 border rounded md:col-span-4">
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={() => {
                setGoldItems([...goldItems, goldItems.length.toString()]);
                setEffDate([...effDate, new Date()]);
              }}
            >
              Add
            </Button>
          </div>
          {goldItems.map((item, index) => {
            let date = new Date();
            return (
              <div key={item} className="flex mt-2">
                <div className="mx-2 my-auto ">
                  <BsXCircle
                    onClick={() => {
                      setGoldItems(goldItems.filter((_, i) => i !== index));
                      setEffDate(effDate.filter((_, i) => i !== index));
                      // console.log(index);
                    }}
                    className="w-5 h-5 text-red-500 rounded-full shadow-lg cursor-pointer"
                  />
                </div>
                <div className="grid grid-cols-6 gap-1 md:gap-2">
                  <div className="col-span-3 md:col-span-1">
                    {/* <label htmlFor="description">{t("date")}</label> */}
                    {/* <input
                    type="text"
                    name="date"
                    id="date"
                    className="w-full h-10 px-4 mt-1 border rounded datepicker "
                    defaultValue={dayjs().format("YYYY-MM-DD")}
                  /> */}
                    <DatePicker
                      className="w-full h-10 px-4 mt-1 border border-gray-200 rounded"
                      selected={effDate[index]}
                      onChange={(newDate: Date) => {
                        console.log(newDate);
                        setEffDate(
                          effDate.map((d, i) => (i === index ? newDate : d))
                        );
                      }}
                      dateFormat="dd/MM/yy"
                    ></DatePicker>
                  </div>
                  <div className="col-span-3 md:col-span-1">
                    {/* <label htmlFor="description">{t("price")}</label> */}
                    <input
                      type="text"
                      name="price"
                      id="price"
                      className="w-full h-10 px-4 mt-1 border border-gray-200 rounded "
                      // defaultValue={20000}
                      placeholder={t("price") ?? "Price"}
                    />
                  </div>
                  <div className="col-span-3 md:col-span-1">
                    {/* <label htmlFor="description">{t("weight")}</label> */}
                    <input
                      type="text"
                      name="weight"
                      id="weight"
                      className="w-full h-10 px-4 mt-1 border border-gray-200 rounded "
                      // defaultValue={index}
                      placeholder={t("weight") ?? "Weight"}
                    />
                  </div>
                  <div className="col-span-3 md:col-span-1">
                    {/* <label htmlFor="description">{t("goldType")}</label> */}
                    <input
                      type="text"
                      name="goldType"
                      id="goldType"
                      className="w-full h-10 px-4 mt-1 border border-gray-200 rounded "
                      // defaultValue={"18k"}
                      placeholder={t("goldType") ?? "Type"}
                    />
                  </div>
                  <div className="col-span-3 md:col-span-1">
                    {/* <label htmlFor="description">{t("goldType")}</label> */}
                    <input
                      type="text"
                      name="goldType"
                      id="goldType"
                      className="w-full h-10 px-4 mt-1 border border-gray-200 rounded "
                      // defaultValue={"18k"}
                      placeholder={t("goldVendor") ?? "Vendor"}
                    />
                  </div>
                  <div className="col-span-3 md:col-span-1">
                    {/* <label htmlFor="description">{t("cost")}</label> */}
                    <input
                      type="text"
                      name="cost"
                      id="cost"
                      className="w-full h-10 px-4 mt-1 text-gray-500 bg-gray-100 border border-gray-200 rounded"
                      defaultValue={0}
                      // TODO: calculate cost
                      // placeholder="Cost"
                      disabled
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full md:col-span-4">
          <label htmlFor="description">{t("note")}</label>
          <input
            type="text"
            name="goldNote"
            id="goldNote"
            className="w-full h-10 px-4 mt-1 border border-gray-200 rounded "
            defaultValue={note}
          />
        </div>
      </div>
    </Disclosure>
  );
};

export default Gold;

export { styles };
