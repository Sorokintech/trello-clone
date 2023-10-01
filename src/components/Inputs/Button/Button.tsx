import React, { FC } from "react";

import cn from "classnames";
import "./Button.scss";

interface IButton {
  title: string;
}

const Button: FC<IButton> = ({ title }) => {
  return <button className={cn("button")}>{title}</button>;
};

export default Button;
