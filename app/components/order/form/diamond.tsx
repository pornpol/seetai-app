import { useTranslation } from "react-i18next";
import Disclosure from "~/components/shared/disclosure";

type Props = {
  note: string;
};

const Diamond: React.FC<Props> = ({ note }) => {
  const { t } = useTranslation(["order"]);

  return (
    <Disclosure topic={t("diamond", { ns: "order" })}>
      <div className="md:col-span-4">
        <label htmlFor="description">{t("note", { ns: "order" })}</label>
        <input
          type="text"
          name="diamondNote"
          id="diamondNote"
          className="w-full h-10 px-4 mt-1 border rounded "
          defaultValue={note}
        />
      </div>
    </Disclosure>
  );
};

export default Diamond;
