const selectorParser = require("postcss-selector-parser");

module.exports = function () {
  return function ({ addVariant, theme, e, prefix }) {
    const darkSelector = theme("darkSelector", ".mode-dark");
    addVariant("dark", ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `${darkSelector} .${e(`dark${separator}${className}`)}`;
      });
    });

    addVariant("dark:hover", ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `${darkSelector} .${e(
          `dark:hover${separator}${className}`
        )}:hover`;
      });
    });

    addVariant("dark:focus", ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `${darkSelector} .${e(
          `dark:focus${separator}${className}`
        )}:focus`;
      });
    });

    addVariant("dark:active", ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `${darkSelector} .${e(
          `dark:active${separator}${className}`
        )}:active, .${e(
          `dark:active${separator}${className}`
        )}[data-active=true]`;
      });
    });

    addVariant("dark:disabled", ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `${darkSelector} .${e(
          `dark:disabled${separator}${className}`
        )}:disabled`;
      });
    });

    addVariant("dark:placeholder", ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `${darkSelector} .${e(
          `dark:placeholder${separator}${className}`
        )}::placeholder`;
      });
    });

    addVariant("dark:selected", ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `${darkSelector} .${e(
          `dark:selected${separator}${className}`
        )}[aria-selected=true]`;
      });
    });

    addVariant("dark:typography", ({ modifySelectors, separator }) => {
      modifySelectors(({ selector }) => {
        return selectorParser((selectors) => {
          selectors.walkClasses((sel) => {
            sel.value = `dark:typography${separator}${sel.value}`;
            sel.parent.insertBefore(
              sel,
              selectorParser().astSync(prefix(".mode-dark "))
            );
          });
        }).processSync(selector);
      });
    });
  };
};
