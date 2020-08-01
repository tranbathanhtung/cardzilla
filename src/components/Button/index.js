import * as React from "react";
import { forwardRef } from "react";
import classNames from "classnames";

import { useButtonClasses } from "./styles";
import Spinner from "../Spinner";

const Button = forwardRef(
  (
    {
      isDisabled,
      isLoading,
      isActive,
      variantColor = "gray",
      variant = "solid",
      type = "button",
      size = "md",
      loadingText,
      iconSpacing = 2,
      className,
      children,
      leftIcon,
      rightIcon,
      ...rest
    },
    ref
  ) => {
    const _isDisabled = isDisabled || isLoading;
    const buttonClasses = useButtonClasses({
      color: variantColor,
      variant,
      size,
      isDisabled: _isDisabled,
      className,
    });

    return (
      <button
        ref={ref}
        disabled={_isDisabled}
        aria-disabled={_isDisabled}
        type={type}
        data-active={isActive ? "true" : undefined}
        className={classNames(buttonClasses, "font-semibold rounded-md")}
        {...rest}
      >
       {leftIcon && !isLoading ? leftIcon : null}
        {isLoading && (
          <Spinner
            className={classNames(
              loadingText ? "relative" : "absolute",
              loadingText ? `mr-${iconSpacing}` : "mr-0"
            )}
            size="sm"
          />
        )}
        {isLoading
          ? loadingText || (
              <span className="opacity-0">
                {children}
              </span>
            )
          : children}
        {rightIcon && !isLoading ? rightIcon : null}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
