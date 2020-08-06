import * as React from "react";
import { useId } from "@reach/auto-id";
import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import classNames from "classnames";

import { usePrevious } from "hooks/usePrevious";

import { wrapEvent } from "../utils";
import CloseButton from "../CloseButton";
import Popper, { PopperArrow } from "../Popper";

/**
 * Hook based idea:
 * const {referenceProps, popoverProps, arrowProps, state, actions} = usePopover(props).
 *
 * The popover must meet the AA Success Criterion
 * https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html
 * https://www.w3.org/WAI/WCAG21/Techniques/client-side-script/SCR39
 */

const PopoverContext = createContext();
const usePopoverContext = () => {
  const context = useContext(PopoverContext);
  if (context == null) {
    throw Error("usePopoverContext must be used within <Popover/>");
  }
  return context;
};

/////////////////////////////////////////////////////////////////////

const PopoverTrigger = ({ children }) => {
  const {
    referenceRef,
    popoverId,
    onToggle,
    trigger,
    onOpen,
    isOpen,
    onClose,
    isHoveringRef,
  } = usePopoverContext();

  const child = Children.only(children);
  let eventHandlers = {};

  if (trigger === "click") {
    eventHandlers = {
      onClick: wrapEvent(child.props.onClick, onToggle),
    };
  }

  const openTimeout = useRef(null);

  if (trigger === "hover") {
    eventHandlers = {
      onFocus: wrapEvent(child.props.onFocus, onOpen),
      onKeyDown: wrapEvent(child.props.onKeyDown, (event) => {
        if (event.key === "Escape") {
          setTimeout(onClose, 300);
        }
      }),
      onBlur: wrapEvent(child.props.onBlur, onClose),
      onMouseEnter: wrapEvent(child.props.onMouseEnter, () => {
        isHoveringRef.current = true;
        openTimeout.current = setTimeout(onOpen, 300);
      }),
      onMouseLeave: wrapEvent(child.props.onMouseLeave, () => {
        isHoveringRef.current = false;
        if (openTimeout.current) {
          clearTimeout(openTimeout.current);
          openTimeout.current = null;
        }
        setTimeout(() => {
          if (isHoveringRef.current === false) {
            onClose();
          }
        }, 300);
      }),
    };
  }

  return cloneElement(child, {
    "aria-haspopup": "dialog",
    "aria-expanded": isOpen,
    "aria-controls": popoverId,
    ref: referenceRef,
    ...eventHandlers,
  });
};

/////////////////////////////////////////////////////////////////////

const PopoverContent = ({
  onKeyDown,
  onBlur: onBlurProp,
  onMouseLeave,
  onMouseEnter,
  onFocus,
  gutter = 4,
  className,
  "aria-label": ariaLabel,
  ...props
}) => {
  const {
    popoverRef,
    referenceRef,
    placement,
    popoverId,
    isOpen,
    onBlur,
    closeOnEsc,
    onClose,
    isHoveringRef,
    trigger,
    headerId,
    bodyId,
    usePortal,
  } = usePopoverContext();

  let eventHandlers = {};
  let roleProps = {};

  if (trigger === "click") {
    eventHandlers = {
      onBlur: wrapEvent(onBlurProp, onBlur),
    };

    roleProps = {
      role: "dialog",
      "aria-modal": "false",
    };
  }

  if (trigger === "hover") {
    eventHandlers = {
      onMouseEnter: wrapEvent(onMouseEnter, () => {
        isHoveringRef.current = true;
      }),
      onMouseLeave: wrapEvent(onMouseLeave, () => {
        isHoveringRef.current = false;
        setTimeout(onClose, 300);
      }),
    };

    roleProps = {
      role: "tooltip",
    };
  }

  eventHandlers = {
    ...eventHandlers,
    onKeyDown: wrapEvent(onKeyDown, (event) => {
      if (event.key === "Escape" && closeOnEsc) {
        onClose && onClose();
      }
    }),
  };
  
  return (
    <Popper
      as="section"
      usePortal={usePortal}
      isOpen={isOpen}
      placement={placement}
      aria-label={ariaLabel}
      anchorEl={referenceRef.current}
      ref={popoverRef}
      id={popoverId}
      aria-hidden={!isOpen}
      modifiers={{ offset: { enabled: true, offset: `0, ${gutter}` } }}
      className={classNames(
        "bg-white dark:bg-gray-700 border relative flex flex-col rounded-md shadow-sm max-w-xs focus:outline-none focus:shadow-outline",
        className
      )}
      aria-labelledby={headerId}
      aria-describedby={bodyId}
      {...roleProps}
      {...eventHandlers}
      {...props}
    />
  );
};

/////////////////////////////////////////////////////////////////////

const Popover = ({
  id,
  isOpen: isOpenProp,
  initialFocusRef,
  defaultIsOpen,
  usePortal = false,
  returnFocusOnClose = true,
  trigger = "click",
  placement,
  children,
  closeOnBlur = true,
  closeOnEsc = true,
  onOpen: onOpenProp,
  onClose: onCloseProp,
}) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen || false);
  const { current: isControlled } = useRef(isOpenProp != null);

  const isHoveringRef = useRef();

  const referenceRef = useRef();
  const popoverRef = useRef();

  const _isOpen = isControlled ? isOpenProp : isOpen;

  const onToggle = () => {
    if (!isControlled) {
      setIsOpen(!_isOpen);
    }

    if (!_isOpen === true) {
      onOpenProp && onOpenProp();
    } else {
      onCloseProp && onCloseProp();
    }
  };

  const onOpen = () => {
    if (!isControlled) {
      setIsOpen(true);
    }

    if (onOpenProp) {
      onOpenProp();
    }
  };

  const onClose = () => {
    if (!isControlled) {
      setIsOpen(false);
    }

    if (onCloseProp) {
      onCloseProp();
    }
  };

  const handleBlur = (event) => {
    if (
      _isOpen &&
      closeOnBlur &&
      popoverRef.current &&
      referenceRef.current &&
      !popoverRef.current.contains(event.relatedTarget) &&
      !referenceRef.current.contains(event.relatedTarget)
    ) {
      onClose();
    }
  };

  // A unique fallback id in case the id prop wasn't passed
  const fallbackId = `popover-${useId()}`;
  const popoverId = id || fallbackId;

  const headerId = `${popoverId}-header`;
  const bodyId = `${popoverId}-body`;

  const prevIsOpen = usePrevious(_isOpen);

  useEffect(() => {
    if (_isOpen && trigger === "click") {
      requestAnimationFrame(() => {
        if (initialFocusRef && initialFocusRef.current) {
          initialFocusRef.current.focus();
        } else {
          if (popoverRef.current) {
            popoverRef.current.focus();
          }
        }
      });
    }

    if (!_isOpen && prevIsOpen && trigger === "click" && returnFocusOnClose) {
      if (referenceRef.current) {
        referenceRef.current.focus();
      }
    }
  }, [
    _isOpen,
    popoverRef,
    initialFocusRef,
    trigger,
    referenceRef,
    prevIsOpen,
    returnFocusOnClose,
  ]);

  const context = {
    popoverRef,
    placement,
    referenceRef,
    headerId,
    bodyId,
    popoverId,
    onOpen,
    onClose,
    onToggle,
    trigger,
    isOpen: _isOpen,
    onBlur: handleBlur,
    closeOnEsc,
    initialFocusRef,
    isHoveringRef,
    usePortal,
  };

  return (
    <PopoverContext.Provider value={context}>
      {typeof children === "function"
        ? children({ isOpen: _isOpen, onClose })
        : children}
    </PopoverContext.Provider>
  );
};

/////////////////////////////////////////////////////////////////////

const PopoverHeader = ({ className, ...props }) => {
  const { headerId } = usePopoverContext();
  return (
    <header
      id={headerId}
      className={classNames("px-3 py-2 border-b", className)}
      {...props}
    />
  );
};

/////////////////////////////////////////////////////////////////////

const PopoverFooter = ({ className, ...props }) => (
  <footer className={classNames("px-3 py-2 border-t", className)} {...props} />
);

/////////////////////////////////////////////////////////////////////

const PopoverBody = ({ className, ...props }) => {
  const { bodyId } = usePopoverContext();
  return (
    <div
      id={bodyId}
      className={classNames("flex-1 px-3 py-2", className)}
      {...props}
    />
  );
};

/////////////////////////////////////////////////////////////////////

const PopoverArrow = (props) => <PopperArrow {...props} />;

/////////////////////////////////////////////////////////////////////

const PopoverCloseButton = ({ onClick, className, style, ...props }) => {
  const { onClose } = usePopoverContext();
  return (
    <CloseButton
      size="md"
      onClick={wrapEvent(onClick, onClose)}
      aria-label="Close"
      className={classNames("absolute rounded-md p-2", className)}
      style={{
        top: 1,
        right: 2,
        ...style,
      }}
      {...props}
    />
  );
};

/////////////////////////////////////////////////////////////////////

export {
  PopoverHeader,
  PopoverFooter,
  PopoverBody,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
};
