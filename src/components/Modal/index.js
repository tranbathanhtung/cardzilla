import * as React from "react";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import { forwardRef } from "react";
import { Transition } from "react-spring/renderprops.cjs";
import { animated } from "react-spring";
import classNames from "classnames";
import { wrapEvent } from "../utils";

import CloseButton from "../CloseButton";

const ModalHeader = ({ className, ...props }) => (
  <header
    className={classNames(
      "px-6 py-5 relative text-xl font-semibold",
      className
    )}
    {...props}
  />
);

const ModalFooter = ({ className, ...props }) => (
  <footer
    className={classNames("px-6 py-4 justify-end", className)}
    {...props}
  />
);

const ModalBody = ({ className, ...props }) => (
  <div className={classNames("px-6 py-2 flex-1", className)} {...props} />
);

const ModalOverlay = forwardRef(
  ({ bg = "rgba(16,22,26,0.7)", zIndex, className, style, ...props }, ref) => (
    <DialogOverlay
      ref={ref}
      className={classNames(
        "fixed bottom-0 top-0 left-0 right-0 overflow-y-auto",
        className
      )}
      style={{
        backgroundColor: bg,
        zIndex,
        ...style,
      }}
      {...props}
    />
  )
);

export const modalContentClass = () => {
  return "bg-white shadow-modal-light dark:shadow-modal-dark dark:bg-gray-700";
};

animated.DialogContent = animated(DialogContent);

const ModalContent = forwardRef(
  ({ className, sectionClass, onClick, children, size = "md", ...props }, ref) => {
    const modalClass = modalContentClass();

    return (
      <animated.DialogContent
        className={classNames(
          `flex flex-col max-w-${size} w-${size} mx-auto`,
          // modalClass,
          className
        )}
        ref={ref}
        {...props}
      >
        <section
          className={classNames(
            `relative w-full h-full flex flex-col z-50 top-0 max-w-${size} w-${size} mx-auto`,
            sectionClass,
            modalClass
          )}
          // style={{
          //   maxHeight: "calc(100vh - 7.5rem)",
          //   overflow: "hidden",
          //   top: "3.75rem",
          //   ...style,
          // }}
          onClick={wrapEvent(onClick, (event) => event.stopPropagation())}
        >
          {children}
        </section>
      </animated.DialogContent>
    );
  }
);

const ModalTransition = ({ isOpen, duration = 150, children }) => {
  return (
    <Transition
      items={isOpen}
      from={{ opacity: 0, y: 10 }}
      enter={{ opacity: 1, y: 0 }}
      leave={{ opacity: 0, y: -10 }}
      config={{ duration }}
    >
      {(isOpen) => isOpen && ((styles) => children(styles))}
    </Transition>
  );
}

const ModalCloseButton = forwardRef(
  ({ className, style, onDismiss, ...props }, ref) => {
    return (
      <CloseButton
        ref={ref}
        onClick={onDismiss}
        className={classNames("absolute", className)}
        style={{
          top: 16,
          right: 12,
          ...style,
        }}
        {...props}
      />
    );
  }
);

ModalCloseButton.displayName = "ModalCloseButton";

export {
  ModalHeader,
  ModalTransition,
  ModalFooter,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
};
