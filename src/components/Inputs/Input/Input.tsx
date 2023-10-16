import React, { FC } from "react";

import cn from "classnames";
import "./Input.scss";
import { IInput } from "../../../assets/types/types";
import saveIcon from "../../../../assets/images/save-icon.png";
import Button from "../Button/Button";

const Input: FC<IInput> = ({
  id,
  type,
  defaultValue,
  placeholder,
  onchange,
  onfocus,
  className,
  createDate,
  labelValue,
}) => {
  return (
    <div className={cn("input-container")}>
      <label htmlFor={id} className={cn("input-container__label")}>
        {labelValue}
      </label>
      {createDate && (
        <div className={cn("input-container__date-label")}>
          Создана {createDate}
        </div>
      )}
      <input
        className={cn("input-container__input", `${className}`)}
        id={id}
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
