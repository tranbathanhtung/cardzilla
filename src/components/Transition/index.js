import * as React from "react";
import { Transition } from "react-spring/renderprops.cjs";

// Easing function from d3-ease: https://github.com/d3/d3-ease/blob/master/src/exp.js
function expOut(t) {
  return 1 - Math.pow(2, -10 * t);
}

///////////////////////////////////////////////////////////////////////////

export const Slide = ({
  in: inProp,
  children,
  duration = 250,
  from,
  finalHeight = "auto",
  finalWidth,
}) => {
  let placements = {
    bottom: {
      maxWidth: "100vw",
      height: finalHeight,
      bottom: 0,
      left: 0,
      right: 0,
    },
    top: {
      maxWidth: "100vw",
      height: finalHeight,
      top: 0,
      left: 0,
      right: 0,
    },
    left: {
      ...(finalWidth && { maxWidth: finalWidth }),
      height: "100vh",
      left: 0,
      top: 0,
    },
    right: {
      ...(finalWidth && { maxWidth: finalWidth }),
      right: 0,
      top: 0,
      height: "100vh",
    },
  };

  let transitionOptions = {
    bottom: {
      offset: "100%",
      transform: (y) => `translateY(${y})`,
    },
    top: {
      offset: "-100%",
      transform: (y) => `translateY(${y})`,
    },
    left: {
      offset: "-100%",
      transform: (x) => `translateX(${x})`,
    },
    right: {
      offset: "100%",
      transform: (x) => `translateX(${x})`,
    },
  };

  const { transform, offset } = transitionOptions[from];
  return (
    <Transition
      items={inProp}
      from={{ opacity: 0, offset }}
      enter={{ opacity: 1, offset: "0%" }}
      leave={{ opacity: 0, offset }}
      config={{ duration, easing: expOut }}
    >
      {(inProp) =>
        inProp &&
        ((styles) =>
          children({
            willChange: "opacity, transform",
            opacity: styles.opacity,
            transform: transform(styles.offset),
            ...placements[from],
          }))
      }
    </Transition>
  );
};
