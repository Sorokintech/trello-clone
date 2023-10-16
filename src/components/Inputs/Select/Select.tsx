import React, { FC } from "react";

import cn from "classnames";
import "./Select.scss";
import { ISelect } from "../../../assets/types/types";

const Select: FC<ISelect> = ({ labelValue, defaultValue, onchange }) => {
  return (
    <div className={cn("select-input")}>
      {labelValue && (
        <label htmlFor="priority" className={cn("select-input__label")}>
          {labelValue}
        </label>
      )}
      <select
        onChange={onchange}
        name="priority"
        id="priority"
        className={cn("select-input__select")}
        defaultValue={defaultValue}
      >
        <option value="Высокий">Высокий</option>
        <option value="Средний">Средний</option>
        <option value="Низкий">Низкий</option>
      </select>
    </div>
  );
};

export default Select;
