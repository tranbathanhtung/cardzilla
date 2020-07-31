import * as React from "react";
import { forwardRef } from "react";
import classNames from "classnames";

const baseClass = "transition-all duration-200 ease-out cursor-pointer no-underline outline-none focus:outline-none focus:shadow-outline disabled:opacity-40 disabled:cursor-not-allowed disabled:no-underline";

const Link = forwardRef(({ isDisabled, isExternal, onClick, className, as: Comp = "a", variantColor: _variantColor, ...rest }, ref) => {
  const externalProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : null;

  return (
    <Comp
      ref={ref}
      tabIndex={isDisabled ? -1 : undefined}
      aria-disabled={isDisabled}
      onClick={isDisabled ? event => event.preventDefault() : onClick}
      className={classNames(
        baseClass,
        "hover:no-underline",
        className,
      )}
      {...externalProps}
      {...rest}
    />
  );
});

Link.displayName = "Link";

export default Link;