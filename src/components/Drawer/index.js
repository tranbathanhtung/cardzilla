import * as React from "react";
import { createContext, useContext, forwardRef } from "react";
import classNames from "classnames";

import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
} from "../Modal";
import { Slide } from "../Transition";

const DrawerContext = createContext({});
const useDrawerContext = () => useContext(DrawerContext);

const Drawer = ({
  isOpen,
  onClose,
  isFullHeight,
  placement = "right",
  finalFocusRef,
  size = "xs",
  children,
  ...props
}) => {

  return (
    <Slide
      in={isOpen}
      from={placement}
      finalHeight={isFullHeight ? "100vh" : "auto"}
    >
      {(styles) => (
        <DrawerContext.Provider value={{ styles, size }}>
          {children}
        </DrawerContext.Provider>
      )}
    </Slide>
  );
};

const drawerSizes = {
  xs: "xs",
  sm: "md",
  md: "lg",
  lg: "2xl",
  xl: "4xl",
  full: "screen",
};

const DrawerContent = forwardRef(({ className, ...props }, ref) => {
  const {
    // Don't want to  animate the opacity of the DrawerContent
    styles: { opacity, ...placementStyles },
    size,
  } = useDrawerContext();

  const _size = size in drawerSizes ? drawerSizes[size] : size;
  
  return (
    <ModalContent
      ref={ref}
      {...props}
      style={{ ...props.styles, ...placementStyles }}
      size={_size}
      className={classNames(`fixed`, className)}
    />
  );
});

DrawerContent.displayName = "DrawerContent";

const DrawerOverlay = forwardRef((props, ref) => {
  const { styles } = useDrawerContext();
  return <ModalOverlay ref={ref} opacity={styles.opacity} {...props} />;
});

DrawerOverlay.displayName = "DrawerOverlay";

const DrawerCloseButton = forwardRef(({ className, ...rest }, ref) => (
  <ModalCloseButton
    ref={ref}
    className={classNames("fixed z-1", className)}
    {...rest}
  />
));

DrawerCloseButton.displayName = "DrawerCloseButton";

export {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  ModalBody as DrawerBody,
  ModalHeader as DrawerHeader,
  ModalFooter as DrawerFooter,
  DrawerCloseButton,
};
