import * as React from "react";
import { forwardRef } from "react";
import classNames from "classnames";

import { inputSizes } from "../Input/styles";

const InputElement = forwardRef(
  (
    {
      size,
      children,
      placement = "left",
      disablePointerEvents = false,
      className,
      ...props
    },
    ref
  ) => {
    const sizeClass = inputSizes[size];
    const placementProp = { [placement]: "0" };

    return (
      <div
        className={classNames(
          "flex items-center justify-center absolute z-1 top-0",
          disablePointerEvents && "pointer-events-none",
          sizeClass,
          className
        )}
        ref={ref}
        style={placementProp}
        {...props}
      >
        {children}
      </div>
    );
  }
);

InputElement.displayName = "InputElement";

const InputLeftElement = forwardRef((props, ref) => (
  <InputElement ref={ref} placement="left" {...props} />
));

InputLeftElement.displayName = "InputLeftElement";

const InputRightElement = forwardRef((props, ref) => (
  <InputElement ref={ref} placement="right" {...props} />
));

InputRightElement.displayName = "InputRightElement";

export { InputLeftElement, InputRightElement };
export default InputElement;
