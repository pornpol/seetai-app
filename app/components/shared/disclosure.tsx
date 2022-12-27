import { Disclosure } from "@headlessui/react";
import { BsChevronUp } from "react-icons/bs";

type Props = {
  children: React.ReactNode;
  topic: string;
  defaultOpen?: boolean;
};

const Component: React.FC<Props> = ({
  children,
  topic,
  defaultOpen = true,
}) => {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-500 bg-gray-200 border-gray-500 rounded-lg border-1 focus-visible:ring hover:shadow-lg">
            <span>{topic}</span>
            <BsChevronUp
              className={`${
                open ? "rotate-180 transform" : ""
              } h-5 w-5 text-gray-500`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pb-2 text-sm">
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Component;
