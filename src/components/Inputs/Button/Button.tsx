import React, { FC } from "react";

import cn from "classnames";
import "./Button.scss";
import { IButton } from "../../../assets/types/types";

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
