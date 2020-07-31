import * as React from "react";
import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import classNames from "classnames";

import Input from "../Input";

const Textarea = forwardRef(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      as="textarea"
      className={classNames("py-2 min-h-20 leading-tight", className)}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;

export const ExpandingTextarea = forwardRef(
  ({ minHeight = "39px", onInput, ...props }, ref) => {
    const [height, setHeight] = useState(0);
    const ownRef = useRef();

    const textareaRef = ref || ownRef;

    useLayoutEffect(() => {
      if (textareaRef.current) {
        setHeight(textareaRef.current.scrollHeight);
      }
    }, [textareaRef]);

    const handleInput = (event) => {
      if (textareaRef.current) {
        setTimeout(() => {
          setHeight("auto");
          setHeight(textareaRef.current.scrollHeight);
        }, 0);
      }
      onInput && onInput(event);
    };

    return (
      <Textarea
        rows="1"
        onInput={handleInput}
        style={{
          height,
          resize: "none",
          overflow: "hidden",
          minHeight,
        }}
        ref={textareaRef}
        {...props}
      />
    );
  }
);

ExpandingTextarea.displayName = "ExpandingTextarea";
