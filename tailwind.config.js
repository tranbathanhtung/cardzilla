const colors = require("./tailwind/colors");

module.exports = {
  purge: [],
  theme: {
    darkSelector: ".mode-dark",
    colors,
    minWidth: (theme) => ({
      auto: "auto",
      ...theme("spacing"),
      lg: "32rem",
      full: "100%",
      screen: "100vw",
    }),
    minHeight: (theme) => ({
      auto: "auto",
      ...theme("spacing"),
      full: "100%",
      screen: "100vw",
    }),
    typography: (theme) => ({
      dark: {
        css: {
          color: theme("colors.gray.300"),
          '[class~="lead"]': {
            color: theme("colors.gray.400"),
          },
          blockquote: {
            color: theme("colors.gray.300"),
            borderLeftColor: theme("colors.gray.700"),
          },
          hr: {
            borderTopColor: theme("colors.gray.800"),
          },
          strong: {
            color: theme("colors.white"),
          },
          "figure figcaption": {
            color: theme("colors.gray.500"),
          },
          a: {
            color: theme("colors.white"),
          },
          th: {
            color: theme("colors.white"),
          },
          "h1, h2, h3, h4": {
            color: theme("colors.white"),
          },
          code: {
            color: theme("colors.gray.300"),
          },
          "code:before": {
            color: theme("colors.gray.300"),
          },
          "code:after": {
            color: theme("colors.gray.300"),
          },
          "ol > li:before": {
            color: theme("colors.gray.400"),
          },
          "ul > li:before": {
            backgroundColor: theme("colors.gray.600"),
          },
        },
      },
    }),
    extend: {
      width: {
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
      },
      height: {
        "3xl": "48rem",
      },
      opacity: {
        "40": "0.4",
      },
      backgroundOpacity: {
        "12": "0.12",
        "16": "0.16",
        "24": "0.24",
        "30": "0.3",
        "60": "0.6",
      },
      textOpacity: {
        "80": "0.8",
      },
      zIndex: {
        "1": "1",
      },
      inset: {
        "4": "2rem",
        "1/2": "50%",
        full: "100%",
      },
    },
  },
  variants: {
    backgroundColor: [
      "hover",
      "focus",
      "selected",
      "dark",
      "dark:hover",
      "dark:focus",
      "dark:selected",
      "dark:typography",
    ],
    borderColor: [
      "hover",
      "focus",
      "selected",
      "dark",
      "dark:hover",
      "dark:focus",
      "dark:selected",
    ],
    textColor: [
      "hover",
      "focus",
      "selected",
      "dark",
      "dark:hover",
      "dark:focus",
      "dark:selected",
      "important",
      "dark:typography",
    ],
    textOpacity: ["dark"],
    backgroundOpacity: ["dark", "dark:active", "dark:hover"],
    boxShadow: ["selected", "focus", "hover"],
    padding: ["responsive", "important"],
    margin: ["responsive", "important"],
    cursor: ["hover", "focus", "disabled"],
    opacity: ["hover", "focus", "disabled"],
    textDecoration: ["important"],
    placeholderColor: ["focus", "dark:focus"],
    typography: ["responsive", "dark:typography"],
  },
  plugins: [
    require("./tailwind/plugins/important"),
    require("./tailwind/plugins/popper"),
    require("./tailwind/plugins/darkMode")(),
    function ({ addVariant, e }) {
      addVariant("selected", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(
            `selected${separator}${className}`
          )}[aria-selected=true]`;
        });
      });
    },
    function ({ addVariant, e }) {
      addVariant("active", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`active${separator}${className}`)}:active, .${e(
            `active${separator}${className}`
          )}[data-active=true]`;
        });
      });
    },
    function ({ addVariant, e }) {
      addVariant("disabled", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(
            `disabled${separator}${className}`
          )}[aria-disabled=true]`;
        });
      });
    },
    require("@tailwindcss/typography"),
  ],
  corePlugins: {
    float: false,
    gridTemplateColumns: false,
    gridColumn: false,
    gridColumnStart: false,
    gridColumnEnd: false,
    gridTemplateRows: false,
    gridRow: false,
    gridRowStart: false,
    gridRowEnd: false,
    gap: false,
    gridAutoFlow: false,
    backgroundAttachment: false,
    divideColor: false,
    divideWidth: false,
    divideOpacity: false,
    borderCollapse: false,
    tableLayout: false,
    scale: false,
    skew: false,
    resize: false,
  },
};
