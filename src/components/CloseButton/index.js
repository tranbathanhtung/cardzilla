import * as React from "react";
import { forwardRef } from "react";
import { X } from "react-feather";

import classNames from "classnames";

const baseClass =
  "inline-flex items-center justify-center rounded-md transition-all duration-200 flex-auto hover:bg-blackAlpha-100 active:bg-blackAlpha-200 disabled:cursor-not-allowed focus:shadow-outline";

const sizes = {
  lg: {
    button: "w-10 h-10",
    // icon: "w-4 h-4",
  },
  md: {
    button: "w-8 h-8",
    // icon: "w-3 h-3",
  },
  sm: {
    button: "w-6 h-6",
    // icon: "w-2 h-2",
  },
};

const iconSizes = {
  lg: 24,
  md: 18,
  sm: 14,
};

const CloseButton = forwardRef(
  (
    {
      size = "md",
      type = "button",
      isDisabled,
      color,
      "aria-label": ariaLabel = "Close",
      className,
      ...rest
    },
    ref
  ) => {
    const buttonSize = sizes[size] && sizes[size]["button"];
    // const iconSize = sizes[size] && sizes[size]["icon"];
    const buttonClass = classNames(
      "outline-none focus:outline-none hover:bg-blackAlpha-100 dark:hover:bg-whiteAlpha-100 active:bg-blackAlpha-200 dark:active:bg-whiteAlpha-200",
      buttonSize,
      baseClass,
      className
    );

    return (
      <button
        ref={ref}
        aria-disabled={isDisabled}
        disabled={isDisabled}
        aria-label={ariaLabel}
        type={type}
        className={buttonClass}
        {...rest}
      >
        <X
          focusable="false"
          size={iconSizes[size]}
          aria-hidden
          className={classNames(
            // iconSize,
            "text-current"
          )}
        />
      </button>
    );
  }
);

export default CloseButton;
