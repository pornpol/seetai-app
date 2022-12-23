import { OrderStatus } from "@prisma/client";
import classNames from "classnames";

type Props = {
  status: string;
  className?: string;
};

const Blade: React.FC<Props> = ({ status, className }) => {
  const statusClasses = classNames(
    "absolute inset-0 rounded-full opacity-50",
    {
      "bg-green-200": status === OrderStatus.OPEN,
    },
    {
      "bg-yellow-200": status === OrderStatus.WIP,
    },
    {
      "bg-red-200": status === OrderStatus.CANCELLED,
    },
    {
      "bg-blue-200": status === OrderStatus.COMPLETED,
    },
    {
      "bg-indigo-200": status === OrderStatus.INVOICED,
    },
    {
      "bg-cyan-200": status === OrderStatus.DELIVERED,
    },
    {
      "bg-gray-200": status === OrderStatus.PAID,
    }
  );

  const classes = classNames(
    "relative inline-block px-3 py-1 font-semibold leading-tight text-green-900",
    className
  );

  return (
    <span className={classes}>
      <span aria-hidden className={statusClasses} />
      <span className="relative">{status}</span>
    </span>
  );
};

export default Blade;
