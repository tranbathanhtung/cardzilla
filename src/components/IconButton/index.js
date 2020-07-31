import * as React from "react";
import { forwardRef } from "react";
import classNames from "classnames";

import Button from "../Button";

const IconButton = forwardRef(
  ({ children, isRound, "aria-label": ariaLabel, className, ...rest }, ref) => {
    const { isFullWidth, leftIcon, rightIcon, loadingText, ...props } = rest;
    const iconButtonClass = classNames(
      '!p-0',
      isRound ? "rounded-full" : "rounded-lg",
      className
    );

    return (
      <Button
        className={iconButtonClass}
        ref={ref}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </Button>
    );
  }
)

export default IconButton;
