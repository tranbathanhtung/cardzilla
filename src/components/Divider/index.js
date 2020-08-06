import * as React from "react";
import { forwardRef } from "react";
import classNames from "classnames";

const Divider = forwardRef(({ orientation, className, ...props }, ref) => {
  const borderClass =
    orientation === "vertical"
      ? "border-l border-solid mx-2"
      : "border-b border-solid my-2";

  const dividerClass = classNames(
    "border-0 opacity-60",
    borderClass,
    "border-current",
    className,
  );

  return (
    <hr
      ref={ref}
      aria-orientation={orientation}
      className={dividerClass}
      {...props}
    />
  );
});

export default Divider;