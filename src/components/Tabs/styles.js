import { useContext } from "react";
import classNames from "classnames";
import { TabContext } from ".";

const baseClass =
  "flex cursor-pointer items-center justify-center transition-all duration-200 focus:z-10";

const lineClass = ({ color }) => {
  return {
    tabList: "border-b-0 border-current",
    tab: `border-b-2 border-transparent	active:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed selected:text-${color}-600 dark:selected:text-${color}-300 selected:border-current`,
  };
};

export const variantClass = (props) => {
  switch (props.variant) {
    case "line":
      return lineClass(props);
    case "unstyled":
      return {};
    default:
      break;
  }
};

export const orientationClass = ({ align, orientation }) => {
  const alignments = {
    end: "end",
    center: "center",
    start: "start",
  };

  let tabListClass;
  let tabClass;

  if (orientation === "horizontal") {
    tabListClass = `items-center justify-${alignments[align]} max-w-full`;

    tabClass = "h-full";
  }

  if (orientation === "vertical") {
    tabListClass = "flex-col";

    tabClass = "w-full";
  }

  return {
    tabList: tabListClass,
    tab: tabClass,
  };
};

const tabSizes = {
  sm: "px-1 py-4 text-sm,",
  md: "text-base px-2 py-4",
  lg: "text-lg px-3 py-4",
};

const disableClass = "disabled:opacity-40 disabled:cursor-not-allowed";

export function useTabClass() {
  const { variant, color, size, isFitted, orientation } = useContext(
    TabContext
  );

  const _variantClass = variantClass({ variant, color });
  const _orientationClass = orientationClass({ orientation });

  return classNames(
    baseClass,
    disableClass,
    tabSizes[size],
    _variantClass && _variantClass.tab,
    _orientationClass && _orientationClass.tab,
    isFitted && "flex-1"
  );
}

export const useTabListClass = () => {
  const { variant, align, orientation } = useContext(TabContext);
  const _variantClass = variantClass({ variant });
  const _orientationClass = orientationClass({ align, orientation });

  return classNames(
    _variantClass && _variantClass.tabList,
    _orientationClass && _orientationClass.tabList
  );
};
