import React, { FC } from "react";

import cn from "classnames";
import "./Button.scss";

interface IButton {
  title: string;
  className: string;
  click?: () => void;
}

const Button: FC<IButton> = ({ title, className, click }) => {
  return (
    <button className={cn(`button ${className}`)} onClick={click}>
      {title}
    </button>
  );
};

export default Button;
