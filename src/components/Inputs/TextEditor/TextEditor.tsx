import React, { FC } from "react";

import cn from "classnames";
import "./Input.scss";
import { IInput } from "../../../assets/types/types";
import saveIcon from "../../../../assets/images/save-icon.png";
import Button from "../Button/Button";

const TextEditor: FC<IInput> = ({
  id,
  type,
  defaultValue,
  placeholder,
  onchange,
  onfocus,
  className,
  createDate,
}) => {
  return (
    <div className={cn("input-wrapper")}>
      {createDate && (
        <label htmlFor={id} className={cn("label")}>
          Создана {createDate}
        </label>
      )}
      <input
        className={cn("input", `${className}`)}
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

export default TextEditor;
