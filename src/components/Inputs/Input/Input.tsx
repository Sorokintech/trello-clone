import React, { FC } from "react";
import cn from "classnames";

import { IInput } from "../../../assets/types/types";

import "./Input.scss";

const Input: FC<IInput> = ({
  id,
  type,
  defaultValue,
  placeholder,
  onchange,
  onfocus,
  className,
  labelValue,
}) => {
  return (
    <div className={cn("input-container")}>
      {labelValue && (
        <label htmlFor={id} className={cn("input-container__label")}>
          {labelValue}
        </label>
      )}
      <input
        className={cn(`input-container__${className}`)}
        id={id}
        autoFocus={`${defaultValue}` === "" ? true : false}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onchange}
        onFocus={onfocus}
        autoComplete="off"
      />
    </div>
  );
};

export default Input;
