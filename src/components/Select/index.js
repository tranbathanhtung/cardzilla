import * as React from "react";
import { forwardRef } from "react";
import classNames from "classnames";
import { ChevronDown } from "react-feather";

import Input from "../Input";

const SelectIconWrapper = forwardRef(function SelectIconWrapper(
  { style, className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={classNames(
        "absolute inline-flex w-6 h-full items-center justify-center pointer-events-none z-1 transform -translate-y-1/2",
        className
      )}
      style={{
        right: "0.5rem",
        top: "50%",
        ...style,
      }}
      {...props}
    />
  );
});

const SelectInput = forwardRef(function SelectInput(
  { placeholder, className, children, ...rest },
  ref
) {
  return (
    <Input
      as="select"
      ref={ref}
      className={classNames(
        "appearance-none pr-8 pb-px leading-normal",
        className
      )}
      {...rest}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {children}
    </Input>
  );
});

const Select = forwardRef(
  ({ rootProps, icon, iconSize = 5, iconColor, className, ...props }, ref) => {
    const opacity = props.isReadOnly || props.isDisabled ? 50 : 100;
    const { className: rootClassName, ...root } = rootProps;
    return (
      <div className={classNames("relative", rootClassName)} {...root}>
        <SelectInput
          ref={ref}
          className={classNames(
            "text-inherit dark:text-whiteAlpha-800",
            className
          )}
          {...props}
        />
        <SelectIconWrapper
          className={`opacity-${opacity} text-inherit dark:text-whiteAlpha-800`}
          // color={iconColor || select.color || color}
        >
          <ChevronDown
            focusable="false"
            aria-hidden="true"
            size={iconSize}
            className={`w-${iconSize} h-${iconSize}`}
          />
        </SelectIconWrapper>
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
