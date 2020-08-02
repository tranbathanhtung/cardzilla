import * as React from "react";
import { forwardRef } from "react";
import classNames from "classnames";
import { AlertCircle } from "react-feather";

import { useFormControl } from "../FormControl";

const FormErrorMessage = forwardRef(
  ({ children, icon, className, ...props }, ref) => {
    const formControl = useFormControl(props);

    if (!formControl.isInvalid) {
      return null;
    }

    return (
      <div
        ref={ref}
        id={formControl.id ? `${formControl.id}-error-message` : null}
        className={classNames(
          "flex items-center mt-2 text-sm text-red-500 dark:text-red-300",
          className
        )}
        {...props}
      >
        <AlertCircle aria-hidden className="mr-2" />
        <p className="leading-normal">{children}</p>
      </div>
    );
  }
);

FormErrorMessage.displayName = "FormErrorMessage";

export default FormErrorMessage;
