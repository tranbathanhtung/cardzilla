import classNames from "classnames";

const grayGhostClasses = "text-currentColor hover:bg-gray-100 active:bg-gray-200 dark:text-whiteAlpha-900 dark:hover:bg-whiteAlpha-200 dark:active:bg-whiteAlpha-300";

const ghostVariantClasses = ({ color }) => {
  let result;
  if (color === "gray") {
    result = grayGhostClasses;
  } else {
    result = `text-${color}-500 bg-transparent hover:bg-${color}-50 active:bg-${color}-100 dark:text-${color}-200 dark:bg-transparent dark:hover:bg-${color}-200 dark:hover:bg-opacity-12 dark:active:bg-${color}-200 dark:active:bg-opacity-24`;
  }

  return result;
};

const outlineVariantClasses = (props) => {
  const { color } = props;
  const borderClasses = color === "gray" ? "border-gray-200 dark:border-whiteAlpha-300" : "border-current";
  return `border ${borderClasses} ${ghostVariantClasses(props)}`;
};

const graySolidClasses =
  "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 dark:bg-whiteAlpha-200 dark:hover:bg-whiteAlpha-300 dark:active:bg-whiteAlpha-400";

const solidVariantClasses = ({ color }) => {
  let classes =
    `bg-${color}-500 text-white hover:bg-${color}-600 active:bg-${color}-700 dark:bg-${color}-200 dark:hover:bg-${color}-300 dark:active:bg-${color}-400 dark:text-gray-800`;

  if (color === "gray") {
    classes = graySolidClasses;
  }

  return classes;
};

const linkVariantClasses = ({ color }) => {
  return `!p-0 h-auto leading-normal text-${color}-500 dark:text-${color}-200 hover:underline active:text-${color}-700 dark:active:text-${color}-500`;
}

const sizes = {
  lg: "h-12 min-w-12 text-lg px-6",
  md: "h-10 min-w-10 text-base px-4",
  sm: "h-8 min-w-8 text-sm px-3",
  xs: "h-6 min-w-6 text-xs px-2",
}

const sizeClasses = ({ size }) => sizes[size];

const focusClasses = "focus:shadow-outline";

const disabledClasses = "opacity-40 cursor-not-allowed shadow-none";

const baseClasses = {
  button:
    "inline-flex appearance-none items-center justify-center transition-all duration-200 select-none relative whitespace-no-wrap align-middle leading-tight outline-none focus:outline-none",
};

const unstyledClasses = "";

const variantClasses = props => {
  switch (props.variant) {
    case "solid":
      return solidVariantClasses(props);
    case "ghost":
      return ghostVariantClasses(props);
    case "link":
      return linkVariantClasses(props);
    case "outline":
      return outlineVariantClasses(props);
    case "unstyled":
      return unstyledClasses;
    default:
      return "";
  }
};

export function useButtonClasses(props) {
  const className = classNames(
    baseClasses.button,
    sizeClasses(props),
    focusClasses,
    props.isDisabled && disabledClasses,
    variantClasses(props),
    props.className,
  );

  return className;
}
