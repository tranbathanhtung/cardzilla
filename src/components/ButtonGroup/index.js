import * as React from "react";
import { cloneElement } from "react";
import classNames from "classnames";

import { cleanChildren } from "../utils";

const ButtonGroup = ({
  size,
  variantColor,
  variant,
  isAttached,
  spacing = 2,
  children,
  className,
  ...rest
}) => {
  const validChildren = cleanChildren(children);
  const clones = validChildren.map((child, index) => {
    const isFirst = index === 0;
    const isLast = index === validChildren.length - 1;

    return cloneElement(child, {
      size: size || child.props.size,
      variantColor: child.props.variantColor || variantColor,
      variant: child.props.variant || variant,
      className: classNames(
        "focus:shadow-outline z-1",
        !isLast && !isAttached && `mr-${spacing}`,
        isFirst && isAttached && "rounded-r-none",
        isLast && isAttached && "rounded-l-none",
        !isLast && isAttached && "border-r-0",
        isFirst && !isLast && isAttached && "rounded-none",
        child.props.className || "",
      ),
    });
  });

  return (
    <div className={classNames("inline-block", className)} {...rest}>
      {clones}
    </div>
  );
};

export default ButtonGroup;