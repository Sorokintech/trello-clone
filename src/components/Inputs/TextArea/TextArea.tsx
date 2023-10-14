import React, { FC } from "react";

import cn from "classnames";
import "./TextArea.scss";
import { ITextArea } from "../../../assets/types/types";

const TextArea: FC<ITextArea> = ({
  id,
  type,
  defaultV,
  placeholder,
  oninput,
  onfocus,
  className,
  createDate,
}) => {
  return (
    <div className={cn("text-area-wrapper")}>
      {createDate && (
        <label htmlFor={id} className={cn("label")}>
          Создана {createDate}
        </label>
      )}

      <textarea
        className={cn("text-area", `${className}`)}
        id={id}
        defaultValue={defaultV}
        placeholder={placeholder}
        autoComplete="off"
        onInput={oninput}
      ></textarea>
    </div>
  );
};

export default TextArea;
