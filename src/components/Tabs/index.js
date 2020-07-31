import * as React from "react";
import { useId } from "@reach/auto-id";
import {
  cloneElement,
  createContext,
  forwardRef,
  useContext,
  useRef,
  useState,
} from "react";
import { useTabListClass, useTabClass } from "./styles";

import { assignRef, cleanChildren } from "../utils";
import classNames from "classnames";

const Tab = forwardRef((props, ref) => {
  const { isSelected, isDisabled, id, size, className, style, as: Comp = "button", ...rest } = props;
  const tabClass = useTabClass();

  return (
    <Comp
      ref={ref}
      role="tab"
      tabIndex={isSelected ? 0 : -1}
      id={`tab:${id}`}
      type="button"
      disabled={isDisabled}
      aria-selected={isSelected}
      aria-disabled={isDisabled}
      aria-controls={`panel:${id}`}
      className={classNames(
        "outline-none focus:outline-none",
        tabClass,
        className
      )}
      style={{ marginBottom: "-2px", ...style }}
      {...rest}
    />
  );
});

Tab.displayName = "Tab";

////////////////////////////////////////////////////////////////////////

const TabList = forwardRef((props, ref) => {
  const { children, onKeyDown, onClick, className, ...rest } = props;

  const {
    id,
    index: selectedIndex,
    manualIndex,
    onManualTabChange,
    isManual,
    onChangeTab,
    onFocusPanel,
    orientation,
  } = useContext(TabContext);

  const tabListClass = useTabListClass();

  const allNodes = useRef([]);

  const validChildren = cleanChildren(children);

  const focusableIndexes = validChildren
    .map((child, index) => (child.props.isDisabled === true ? null : index))
    .filter((index) => index != null);

  const enabledSelectedIndex = focusableIndexes.indexOf(selectedIndex);
  const count = focusableIndexes.length;

  const updateIndex = (index) => {
    const childIndex = focusableIndexes[index];
    allNodes.current[childIndex].focus();
    onChangeTab && onChangeTab(childIndex);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      const nextIndex = (enabledSelectedIndex + 1) % count;
      updateIndex(nextIndex);
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      const nextIndex = (enabledSelectedIndex - 1 + count) % count;
      updateIndex(nextIndex);
    }

    if (event.key === "Home") {
      event.preventDefault();
      updateIndex(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      updateIndex(count - 1);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      onFocusPanel && onFocusPanel();
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  const clones = validChildren.map((child, index) => {
    let isSelected = isManual ? index === manualIndex : index === selectedIndex;

    const handleClick = (event) => {
      // Hack for Safari. Buttons don't receive focus on click on Safari
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
      allNodes.current[index].focus();

      onManualTabChange(index);
      onChangeTab(index);

      if (child.props.onClick) {
        child.props.onClick(event);
      }
    };

    return cloneElement(child, {
      ref: (node) => (allNodes.current[index] = node),
      isSelected,
      onClick: handleClick,
      id: `${id}-${index}`,
    });
  });

  return (
    <div
      onKeyDown={handleKeyDown}
      ref={ref}
      role="tablist"
      aria-orientation={orientation}
      className={classNames("flex", tabListClass, className)}
      {...rest}
    >
      {clones}
    </div>
  );
});

TabList.displayName = "TabList";

////////////////////////////////////////////////////////////////////////

export const TabContext = createContext();

const Tabs = forwardRef(
  (
    {
      children,
      onChange,
      index: controlledIndex,
      defaultIndex,
      isManual,
      variant = "line",
      variantColor = "blue",
      align = "start",
      size = "md",
      orientation = "horizontal",
      isFitted,
      ...props
    },
    ref
  ) => {
    const { current: isControlled } = useRef(controlledIndex != null);
    const selectedPanelRef = useRef();

    const getInitialIndex = () => {
      if (!isManual) {
        return defaultIndex || 0;
      } else {
        return controlledIndex || defaultIndex || 0;
      }
    };

    const getActualIdx = () => {
      if (isManual) {
        return selectedIndex;
      } else {
        return isControlled ? controlledIndex : selectedIndex;
      }
    };

    const [selectedIndex, setSelectedIndex] = useState(getInitialIndex);
    const [manualIndex, setManualIndex] = useState(
      controlledIndex || defaultIndex || 0
    );

    let actualIdx = getActualIdx();
    let manualIdx = isControlled ? controlledIndex : manualIndex;

    const onChangeTab = (index) => {
      if (!isControlled) {
        setSelectedIndex(index);
      }

      if (isControlled && isManual) {
        setSelectedIndex(index);
      }

      if (!isManual) {
        onChange && onChange(index);
      }
    };

    const onManualTabChange = (index) => {
      if (!isControlled) {
        setManualIndex(index);
      }

      if (isManual) {
        onChange && onChange(index);
      }
    };

    const onFocusPanel = () => {
      if (selectedPanelRef.current) {
        selectedPanelRef.current.focus();
      }
    };

    const id = useId();

    const context = {
      id,
      index: actualIdx,
      manualIndex: manualIdx,
      onManualTabChange,
      isManual,
      onChangeTab,
      selectedPanelRef,
      onFocusPanel,
      color: variantColor,
      size,
      align,
      variant,
      isFitted,
      orientation,
    };

    return (
      <TabContext.Provider value={context}>
        <div ref={ref} {...props}>
          {children}
        </div>
      </TabContext.Provider>
    );
  }
);

Tabs.displayName = "Tabs";

////////////////////////////////////////////////////////////////////////

const TabPanel = forwardRef(
  ({ children, isSelected, selectedPanelRef, id, className, ...rest }, ref) => {
    return (
      <div
        ref={(node) => {
          if (isSelected) {
            assignRef(selectedPanelRef, node);
          }
          assignRef(ref, node);
        }}
        role="tabpanel"
        tabIndex={-1}
        aria-labelledby={`tab:${id}`}
        hidden={!isSelected}
        id={`panel:${id}`}
        className={classNames("outline-0", className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

TabPanel.displayName = "TabPanel";

////////////////////////////////////////////////////////////////////////

const TabPanels = forwardRef(({ children, ...rest }, ref) => {
  const {
    index: selectedIndex,
    selectedPanelRef,
    id,
    isManual,
    manualIndex,
  } = useContext(TabContext);

  const validChildren = cleanChildren(children);

  const clones = validChildren.map((child, index) => {
    return cloneElement(child, {
      isSelected: isManual ? index === manualIndex : index === selectedIndex,
      selectedPanelRef,
      id: `${id}-${index}`,
    });
  });

  return (
    <div tabIndex="-1" ref={ref} {...rest}>
      {clones}
    </div>
  );
});

TabPanels.displayName = "TabPanels";

////////////////////////////////////////////////////////////////////////

export default Tabs;
export { TabList, Tab, TabPanels, TabPanel };
