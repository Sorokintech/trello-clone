import React, { FC } from "react";

import cn from "classnames";
import "./Input.scss";

interface IInput {
  id: string;
  type: string;
  defaultV: string;
  className?: string;
  placeholder?: string;
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<IInput> = ({
  id,
  type,
  defaultV,
  placeholder,
  onchange,
  className,
}) => {
  return (
    <input
      className={cn("input", `${className}`)}
      id={id}
      type={type}
      defaultValue={defaultV}
      placeholder={placeholder}
      onChange={onchange}
      autoComplete="off"
    />
  );
};

export default Input;
