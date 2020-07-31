import {
  Children,
  isValidElement,
  useMemo,
  useLayoutEffect,
  useEffect,
} from "react";

export const assignRef = (ref, value) => {
  if (ref == null) return;
  if (typeof ref === "function") {
    ref(value);
  } else {
    try {
      ref.current = value;
    } catch (error) {
      throw new Error(`Cannot assign value "${value}" to ref "${ref}"`);
    }
  }
};

const focusableElList = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "embed",
  "iframe",
  "input:not([disabled])",
  "object",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "*[tabindex]:not([aria-disabled])",
  "*[contenteditable]",
];

const focusableElSelector = focusableElList.join();

export function getFocusables(element, keyboardOnly = false) {
  let focusableEls = Array.from(element.querySelectorAll(focusableElSelector));

  // filter out elements with display: none
  focusableEls = focusableEls.filter(
    focusableEl => window.getComputedStyle(focusableEl).display !== "none",
  );

  if (keyboardOnly === true) {
    focusableEls = focusableEls.filter(
      focusableEl => focusableEl.getAttribute("tabindex") !== "-1",
    );
  }

  return focusableEls;
}

export function cleanChildren(children) {
  return Children.toArray(children).filter(child => isValidElement(child));
}

export function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

export function useForkRef(refA, refB) {
  return useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return refValue => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}

export const useEnhancedEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const wrapEvent = (theirHandler, ourHandler) => event => {
  if (theirHandler) {
    theirHandler(event);
  }

  if (!event.defaultPrevented) {
    return ourHandler(event);
  }
};

export function createChainedFunction(...funcs) {
  return funcs.reduce(
    (acc, func) => {
      if (func == null) {
        return acc;
      }

      return function chainedFunction(...args) {
        acc.apply(this, args);
        func.apply(this, args);
      };
    },
    () => {},
  );
}

