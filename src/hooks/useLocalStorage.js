import { useState, useCallback, useLayoutEffect } from "react";
import { localStorageGetItem, localStorageSetItem } from "storage";
// Forked from https://usehooks.com/useLocalStorage/
export function useLocalStorage(key, initialValue) {
  const getValueFromLocalStorage = useCallback(() => {
    try {
      const item = localStorageGetItem(key);
      if (item != null) {
        return JSON.parse(item);
      }
    } catch (error) {
      console.log(error);
    }
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState(getValueFromLocalStorage);

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        localStorageSetItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.log(error);
      }
    },
    [key, storedValue]
  );

  // Listen for changes to this local storage value made from other windows.
  // This enables the e.g. "⚛️ Elements" tab to update in response to changes from "⚛️ Settings".
  useLayoutEffect(() => {
    const onStorage = (event) => {
      const newValue = getValueFromLocalStorage();
      if (key === event.key && storedValue !== newValue) {
        setValue(newValue);
      }
    };

    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, [getValueFromLocalStorage, key, storedValue, setValue]);

  return [storedValue, setValue];
}
