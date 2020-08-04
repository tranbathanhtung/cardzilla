export const solidClass = ({ color }) => {
  return `bg-${color}-500 text-white dark:bg-${color}-500 dark:bg-opacity-60 dark:text-whiteAlpha-800`;
};

export const subtleClass = ({ color }) => {
  return `bg-${color}-100 text-${color}-800 dark:bg-${color}-200 dark:bg-opacity-30 dark:text-${color}-200`;
};

export const outlineClass = ({ color }) => {
  return `border border-${color}-500 text-${color}-500 dark:text-${color}-200 dark:text-opacity-80 dark:border-${color}-200 dark:border-opacity-80`;
};

const variantProps = (props) => {
  const { variant } = props;
  switch (variant) {
    case "solid":
      return solidClass(props);
    case "subtle":
      return subtleClass(props);
    case "outline":
      return outlineClass(props);
    default:
      return {};
  }
};

export const useBadgeClass = (props) => {
  return variantProps(props);
};
