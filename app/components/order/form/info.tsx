import { useRef } from "react";
import { useTranslation } from "react-i18next";
import Disclosure from "~/components/shared/disclosure";

type Props = {
  desc: string;
  customers: any[];
  customer: any;
};

const Info: React.FC<Props> = ({ desc, customer, customers }) => {
  const { t } = useTranslation(["order", "common"]);

  const refSale = useRef<any>(null);

  return (
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
            className="w-full h-10 px-4 mt-1 border border-gray-200 rounded"
            defaultValue={desc}
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="customer">{t("customer", { ns: "order" })}</label>
          <select
            name="customerId"
            id="customerId"
            className="w-full h-10 px-4 mt-1 border border-gray-200 rounded "
            defaultValue={customer?.id}
            onChange={(e) => {
              refSale.current.value = customers.find(
                (cust: any) => cust.id === e.target.value
              ).user.name;
            }}
          >
            {/* <option disabled selected>
              -- {t("customer")} --
            </option> */}
            {customers.map((cust: any) => (
              <option key={cust.id} value={cust.id} disabled={!cust.active}>
                {cust.name}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="sale">{t("saleperson", { ns: "order" })}</label>
          <input
            ref={refSale}
            type="text"
            // name="userId"
            // id="userId"
            className="w-full h-10 px-4 mt-1 text-gray-500 bg-gray-100 border-gray-200 rounded"
            defaultValue={customer?.user.name ?? customers[0]?.user.name}
            // value={refCustomer.current?.value}
            disabled
          />
        </div>
      </div>
    </Disclosure>
  );
};

export default Info;
