import * as React from "react";
import { forwardRef } from "react";
import classNames from "classnames";

import { useBadgeClass } from "./styles";

const Badge = forwardRef(
  ({ variantColor = "gray", variant = "subtle", className, ...props }, ref) => {
    // Wrong usage of `variantColor` prop is quite common
    // Let's add a warning hook that validates the passed variantColor
    const badgeClasses = useBadgeClass({ color: variantColor, variant });
    const baseClass = "inline-block px-1 uppercase text-xs rounded-sm font-bold whitespace-no-wrap align-middle";
    return (
      <div
        ref={ref}
        className={classNames(baseClass, badgeClasses, className)}
        {...props}
      />
    );
  },
);

Badge.displayName = "Badge";

export default Badge;