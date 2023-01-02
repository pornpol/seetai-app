import { useTranslation } from "react-i18next";
import Disclosure from "~/components/shared/disclosure";

type Props = {
  note: string;
};

const FactoryList: React.FC<Props> = ({ note }) => {
  const { t } = useTranslation(["order"]);

  return (
    <Disclosure topic={t("factoryList")}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="md:col-span-4">
          <label htmlFor="description">{t("note")}</label>
          <input
            type="text"
            name="factoryListNote"
            id="factoryListNote"
            className="w-full h-10 px-4 mt-1 border border-gray-200 rounded "
            defaultValue={note}
          />
        </div>
        <div className="md:col-span-4">{/* <GoldItems></GoldItems> */}</div>
      </div>
    </Disclosure>
  );
};

export default FactoryList;
