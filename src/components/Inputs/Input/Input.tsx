import React, { FC } from "react";

import cn from "classnames";
import "./Input.scss";
import { IInput } from "../../../assets/types/types";

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
