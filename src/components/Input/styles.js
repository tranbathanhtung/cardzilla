import classNames from "classnames";

const outlinedClass = () => {
  return "border-1 border-inherit dark:border-whiteAlpha-50 bg-white dark:bg-whiteAlpha-100 hover:border-gray-300 dark:hover:border-whiteAlpha-200 disabled:opacity-40 disabled:cursor-not-allowed focus:shadow-outline";
};

const filledClass = () => {
  return "border-2 border-transparent bg-gray-100 dark:bg-whiteAlpha-50 hover:bg-gray-200 dark:hover:bg-whiteAlpha-100 disabled:opacity-40 disabled:cursor-not-allowed focus:bg-transparent focus:shadow-outline";
};

const flushedClass = () => {
  return "border-b-2 border-inherit rounded-none px-0 bg-transparent focus:shadow-outline";
};

const unstyledClass = "bg-transparent px-0 h-auto";

const variantClass = props => {
  switch (props.variant) {
    case "flushed":
      return flushedClass(props);
    case "unstyled":
      return unstyledClass;
    case "filled":
      return filledClass(props);
    case "outline":
      return outlinedClass(props);
    default:
      return {};
  }
};

const baseClass = "flex items-center relative transition-all duration-200 outline-none appearance-none"

export const inputSizes = {
  lg: "text-lg px-4 h-12 rounded-md",
  md: "text-base px-4 h-10 rounded-md",
  sm: "text-sm px-3 h-8 rounded-md",
  xs: "text-xs px-2 h-6 rounded-md",
};

const sizeClass = props => inputSizes[props.size];

export const useInputClass = props => {
  const inputClass = classNames(
    props.isFullWidth && "w-full",
    baseClass,
    sizeClass(props),
    variantClass(props),
  );

  return inputClass;
};