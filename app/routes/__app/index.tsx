import { Link } from "@remix-run/react";
import { Breadcrumb } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { HiHome } from "react-icons/hi";

export default function IndexPage() {
  let { t } = useTranslation();

  return (
    <Breadcrumb aria-label="Default breadcrumb example" className="mb-4">
      <Breadcrumb.Item icon={HiHome}>
        <Link to="/">Home</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link to="/orders">Orders</Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}
