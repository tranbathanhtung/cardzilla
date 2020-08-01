import * as React from "react";
import { forwardRef } from "react";
import classNames from "classnames";

import VisuallyHidden from "../VisuallyHidden";

const sizes = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12",
};

const Spinner = forwardRef(
  ({ size = "md", label = "Loading...", className, ...props }, ref) => {
    const _size = sizes[size] || size;

    return (
      <div
        ref={ref}
        className={classNames("spin", _size, className)}
        {...props}
      >
        {label && <VisuallyHidden>{label}</VisuallyHidden>}
      </div>
    );
  }
);

Spinner.displayName = "Spinner";

export default Spinner;
