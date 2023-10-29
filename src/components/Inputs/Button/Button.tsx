import React, { FC } from "react";
import cn from "classnames";

import { IButton } from "../../../assets/types/types";

import "./Button.scss";

const Button: FC<IButton> = ({ title, className, click }) => {
  return (
    <button
      className={cn("button", `${className ? className : ""}`)}
      onClick={click}
    >
      {title}
    </button>
  );
};

export default Button;
