import React, { FC } from "react";

import cn from "classnames";
import "./Input.scss";
import { IInput } from "../../../assets/types/types";
import saveIcon from "../../../../assets/images/save-icon.png";
import Button from "../Button/Button";

const Input: FC<IInput> = ({
  id,
  type,
  defaultV,
  placeholder,
  onchange,
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
        defaultValue={defaultV}
        placeholder={placeholder}
        onChange={onchange}
        autoComplete="off"
      />
      {/* {}<img
        className={cn(
          "sub-task-section__save-icon-default"
          // "sub-task-section__save-icon-shown"
        )}
        src={saveIcon}
        alt="save_icon"
        onClick={() => dispatchUpdatedSubTask()}
      /> */}
    </div>
  );
};

export default Input;
