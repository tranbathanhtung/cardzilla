import * as React from "react";
import classNames from "classnames";

import { useInputClass } from "../Input/styles";

const InputAddon = ({ placement = "left", size = "md", className, ...props }) => {
  const _placement = {
    left: "-mr-px rounded-r-none border-transparent",
    right: "order-1 rounded-l-none border-transparent",
  };

  const classes = classNames(
    useInputClass({ size, variant: "outline" }),
    "flex-auto whitespace-no-wrap bg-gray-100 dark:bg-whiteAlpha-300",
    _placement[placement],
    className,
  );

  return <div className={classes} {...props} />;
};

const InputLeftAddon = (props) => <InputAddon placement="left" {...props} />;
const InputRightAddon = (props) => <InputAddon placement="right" {...props} />;

export { InputLeftAddon, InputRightAddon };
export default InputAddon;
