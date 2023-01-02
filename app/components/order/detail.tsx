import { Form } from "@remix-run/react";
import { useTranslation } from "react-i18next";

import Button from "~/components/shared/button";

import InfoForm from "./form/info";
import GoldForm, { styles as goldStyles } from "./form/gold";
import DiamondForm from "./form/diamond";
import FactoryCostForm from "./form/factoryCost";
import FactoryListForm from "./form/factoryList";
import ImagesForm, { styles as imageStyles } from "./form/image";
import { useEffect, useState } from "react";

type Props = {
  item: any; // FIXME:
  // sales: any; // FIXME:
  customers: any; // FIXME:
};

const OrderDetail: React.FC<Props> = ({ item, customers }) => {
  const { t } = useTranslation(["order", "common"]);

  return (
    <>
      <Form method={item?.id ? "put" : "post"}>
        <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3">
          <div className="p-4 rounded-lg shadow">
            <ImagesForm images={item?.images} />
          </div>

          <div className="flex flex-col p-4 mt-4 space-y-4 rounded-lg shadow lg:col-span-2 lg:mt-0">
            <InfoForm
              desc={item?.description}
              customers={customers}
              customer={item?.customer}
            />
            <GoldForm note={item?.goldNote} />
            <DiamondForm note={item?.diamondNote} />
            <FactoryListForm note={item?.factoryListNote} />
            <FactoryCostForm note={item?.factoryCostNote} />

            <div className="ml-auto">
              <Button type="submit" color="blue" className="w-24">
                {t("save", { ns: "common" })}
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default OrderDetail;

export function links() {
  return [
    { rel: "stylesheet", href: imageStyles },
    { rel: "stylesheet", href: goldStyles },
  ];
}
