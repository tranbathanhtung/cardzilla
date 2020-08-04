import * as React from "react";
import { memo, useRef } from "react";
import { Check } from "react-feather";
import { useRecoilState } from "recoil";

import {
  IconButton,
  RadioButtonGroup,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "components";
import * as S from "selectors";

const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
];

const ButtonColor = React.forwardRef((props, ref) => {
  const { isChecked, isDisabled, value, ...rest } = props;

  return (
    <IconButton
      ref={ref}
      variantColor={value}
      aria-checked={isChecked}
      role="radio"
      isDisabled={isDisabled}
      size="sm"
      isRound
      {...rest}
    >
      {isChecked && <Check size={18} />}
    </IconButton>
  );
});

export const ColorPicker = memo(({ className }) => {
  const [color, setColor] = useRecoilState(S.color);
  const buttonRef = useRef(null);

  return (
    <Popover closeOnBlur placement="bottom" initialFocusRef={buttonRef}>
      <PopoverTrigger>
        <IconButton
          variantColor={color}
          role="radio"
          size="sm"
          isRound
        />
      </PopoverTrigger>
      <PopoverContent className="z-10 w-40 border-gray-100 dark:border-gray-700">
        <PopoverArrow />
        <PopoverBody>
          <RadioButtonGroup
            className="flex flex-wrap"
            defaultValue={color}
            onChange={setColor}
            spacing={3}
            isInline
          >
            <ButtonColor ref={buttonRef} value="gray" className="mb-3" />
            {colors.map((color) => (
              <ButtonColor value={color} key={color} className="mb-3" />
            ))}
          </RadioButtonGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
});
