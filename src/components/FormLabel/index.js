import * as React from "react";
import { forwardRef } from "react";
import classNames from "classnames";

export const FormLabel = forwardRef(
  ({ children, className, ...props }, ref) => {
    const labelClasses = classNames(
      "pr-3 pb-1",
      `text-sm ${
        props.isDisabled ? "opacity-40" : "opacity-100"
      } font-medium text-left align-middle inline-block`,
      className
    );

    return (
      <label ref={ref} className={labelClasses} {...props}>
        {children}
      </label>
    );
  }
);

FormLabel.displayName = "FormLabel";

export default FormLabel;
