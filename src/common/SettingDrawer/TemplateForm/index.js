import * as React from "react";
import { memo } from "react";
import { Check } from "react-feather";

import {
  IconButton,
  Button,
  RadioButtonGroup,
} from "components";
import { useTheme } from "context/ThemeContext";

const ButtonTheme = React.forwardRef((props, ref) => {
  const { isChecked, isDisabled, value, ...rest } = props;
  const { color } = useTheme();

  return (
    <Button
      ref={ref}
      variantColor={isChecked ? color : "gray"}
      aria-checked={isChecked}
      role="radio"
      isDisabled={isDisabled}
      size="md"
      {...rest}
    />
  );
});

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

const ThemeSetting = memo(() => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="my-4 w-full h-full">
      <RadioButtonGroup
        defaultValue={theme}
        onChange={setTheme}
        isInline={true}
        className="flex flex-no-wrap items-center"
      >
        <ButtonTheme
          aria-label="Theme Light"
          value="light"
          className="w-1/2 bg-gray-300"
        >
          Light
        </ButtonTheme>
        <ButtonTheme
          aria-label="Theme Dark"
          value="dark"
          className="w-1/2 bg-gray-300"
        >
          Dark
        </ButtonTheme>
      </RadioButtonGroup>
    </div>
  );
});

const ColorSetting = () => {
  const { color, setColor } = useTheme();

  return (
    <div className="my-4 w-full h-full">
      <RadioButtonGroup
        className="flex"
        defaultValue={color}
        onChange={setColor}
        spacing={3}
        isInline
      >
        {colors.map((color) => (
          <ButtonColor value={color} key={color} />
        ))}
      </RadioButtonGroup>
    </div>
  );
};

export const TemplateForm = memo(() => {
  return (
    <div className="my-4">
      <ThemeSetting />
      <ColorSetting />
    </div>
  );
});
