import * as React from "react";
import { forwardRef } from "react";
import { useBadgeClass } from "../Badge/styles";
import classNames from "classnames";
// import { X } from "../../icons";

const baseClass = "inline-flex items-center min-h-6 max-h-full rounded-lg font-medium outline-none";

const tagSizes = {
  sm:"min-h-6 min-w-6 text-sm px-2",
  md:"min-h-7 min-w-7 text-sm px-2",
  lg:"min-h-8 min-w-8 px-3",
};

export const TagCloseButton = ({ isDisabled, className, ...props }) => (
  <button
    className={classNames(`flex items-center justify-center transition-all duration-200 rounded-full w-5 h-5 outline-none -mr-1 opacity-50 ${isDisabled ? "opacity-40 cursor-not-allowed shadow-none" : ""} focus:outline-none focus:shadow-outline focus:bg-blackAlpha-300 hover:opacity-80 active:opacity-100`, className)}
    {...props}
  >
    {/* <X size={18}/> */}
  </button>
);

export const TagLabel = ({ className, ...props }) => (
  <span className={classNames("leading-tight", className)} {...props} />
);

export const Tag = forwardRef(({
  variant = "subtle",
  size = "lg",
  variantColor = "gray",
  className,
  ...rest
}, ref) => {
  const classProps = useBadgeClass({ color: variantColor, variant });
  const sizeClassess = tagSizes[size];

  return (
    <div
      ref={ref}
      className={classNames(sizeClassess, classProps, baseClass, className)}
      {...rest}
    />
  )
});

export default Tag;
