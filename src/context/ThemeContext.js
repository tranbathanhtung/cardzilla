import * as React from "react";
import {
  useMemo,
  useContext,
  createContext,
  useLayoutEffect,
} from "react";

import { useLocalStorage } from "hooks/useLocalStorage";

const ThemeContext = createContext(null);
ThemeContext.displayName = "ThemeContext";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [color, setColor] = useLocalStorage("color", "teal");

  const value = useMemo(
    () => ({
      theme,
      color,
      setTheme,
      setColor,
    }),
    [theme, setTheme, color, setColor]
  );

  useLayoutEffect(() => {
    switch (theme) {
      case "light":
        document.body.classList.add("mode-light");
        document.body.classList.remove("mode-dark");
        break;
      case "dark":
        document.body.classList.add("mode-dark");
        document.body.classList.remove("mode-light");
        break;
      default:
        throw Error(`Unsupported theme value "${theme}"`);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const ThemeContextConsumer = ThemeContext.Consumer;
ThemeContextConsumer.displayName = "ThemeContextConsumer";

export const useTheme = () => {
  return useContext(ThemeContext);
};
