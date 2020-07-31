import * as React from "react";
import { forwardRef } from "react";
import classNames from "classnames";

import { useFormControl } from "../FormControl";

export const FormHelperText = forwardRef(({ className, ...props }, ref) => {
  const formControl = useFormControl(props);

  return (
    <p
      ref={ref}
      id={formControl.id ? `${formControl.id}-help-text` : null}
      className={classNames(
        "mt-2 text-gray-500 dark:text-whiteAlpha-600 text-sm leading-normal",
        className
      )}
      {...props}
    />
  );
});

FormHelperText.displayName = "FormHelperText";

export default FormHelperText;
