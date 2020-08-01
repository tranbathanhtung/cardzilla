import * as React from "react";
import classNames from "classnames";

const VisuallyHidden = ({ as = "div", className, style, ...props }) => {
  const Comp = as;
  return (
    <Comp
      className={classNames(
        "border-0 h-px w-px p-0 overflow-hidden absolute -m-px whitespace-no-wrap",
        className
      )}
      style={{ clip: "rect(0px, 0px, 0px, 0px)", ...style }}
      {...props}
    />
  );
};

VisuallyHidden.displayName = "VisuallyHidden";

export default VisuallyHidden;
