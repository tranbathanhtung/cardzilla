import * as React from "react";
import { memo, useCallback } from "react";
import { Sun, Moon } from "react-feather";
import { useRecoilState } from "recoil";

import { IconButton } from "components";
import * as S from "selectors";

export const ThemeSwitcher = memo(() => {
  const [theme, setTheme] = useRecoilState(S.theme)

  const handleChangeTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    
  }, [theme, setTheme]);

  return (
    <IconButton
      size="md"
      variantColor="gray"
      variant="solid"
      aria-label="Theme"
      className="bg-gray-300"
      onClick={handleChangeTheme}
    >
      {(!theme || theme === "light") ? <Moon size={18} /> : <Sun size={18} />}
    </IconButton>
  )
});
