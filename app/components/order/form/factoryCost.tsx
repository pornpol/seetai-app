import { useTranslation } from "react-i18next";
import Disclosure from "~/components/shared/disclosure";

type Props = {
  note: string;
};

const FactoryCost: React.FC<Props> = ({ note }) => {
  const { t } = useTranslation(["order"]);

  return (
    <Disclosure topic={t("factoryCost")}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="md:col-span-4">
          <label htmlFor="description">{t("note")}</label>
          <input
            type="text"
            name="factoryCostNote"
            id="factoryCostNote"
            className="w-full h-10 px-4 mt-1 border rounded "
            defaultValue={note}
          />
        </div>
        <div className="md:col-span-4">{/* <GoldItems></GoldItems> */}</div>
      </div>
    </Disclosure>
  );
};

export default FactoryCost;