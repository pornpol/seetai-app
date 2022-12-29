import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  color?: string;
  className?: string;
}

const Button: React.FC<Props> = ({
  children,
  color = "blue",
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${className} px-4 py-2 font-bold text-white bg-${color}-500 rounded hover:bg-${color}-700`}
    >
      {children}
    </button>
  );
};

export default Button;
