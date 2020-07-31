import * as React from "react";
import { forwardRef } from "react";
import classNames from "classnames";

import { useFormControl } from "../FormControl";
import { useInputClass } from "./styles";

const Input = forwardRef((props, ref) => {
  const {
    size,
    variant,
    as: Comp = "input",
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedby,
    isReadOnly,
    isFullWidth,
    isDisabled,
    isInvalid,
    isRequired,
    className,
    ...rest
  } = props;

  const inputClass = useInputClass({
    ...props,
  });
  const formControl = useFormControl(props);

  return (
    <Comp
      ref={ref}
      readOnly={formControl.isReadOnly}
      aria-readonly={isReadOnly}
      disabled={formControl.isDisabled}
      aria-label={ariaLabel}
      aria-invalid={formControl.isInvalid}
      required={formControl.isRequired}
      aria-required={formControl.isRequired}
      aria-disabled={formControl.isDisabled}
      aria-describedby={ariaDescribedby}
      className={classNames(inputClass, className)}
      {...rest}
    />
  );
});

Input.displayName = "Input";

Input.defaultProps = {
  size: "md",
  variant: "outline",
  isFullWidth: true,
};

export default Input;
