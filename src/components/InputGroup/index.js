import * as React from "react";
import { cloneElement } from "react";
import classNames from "classnames";

import Input from "../Input";
import { InputLeftElement, InputRightElement } from "../InputElement";
import { cleanChildren } from "../utils";

const inputSizes = {
  lg: "12",
  md: "10",
  sm: "8",
  xs: "6",
};

const sizes = {
  "12": "3rem",
  "10": "2.5rem",
  "8": "2rem",
  "6": "1.5rem",
};

const InputGroup = ({ children, className, size = "md", ...props }) => {
  const height = inputSizes[size];
  let pl = null;
  let pr = null;
  const validChildren = cleanChildren(children);
  return (
    <div className={classNames("flex relative", className)} {...props}>
      {validChildren.map((child) => {
        if (child.type === InputLeftElement) {
          pl = sizes[height];
        }
        if (child.type === InputRightElement) {
          pr = sizes[height];
        }
        if (child.type === Input) {
          const finalPl = child.props.pl || pl;
          const finalPr = child.props.pr || pr;

          return cloneElement(child, {
            size,
            className: classNames(
              finalPl && `pl-${finalPl}`,
              finalPr && `pl-${finalPr}`,
              child.props.className
            ),
          });
        }
        return cloneElement(child, { size });
      })}
    </div>
  );
};

export default InputGroup;
