const selectorParser = require("postcss-selector-parser");

function darkMode() {
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

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: ["./src/**/*.js"],
    // These options are passed through directly to PurgeCSS
    options: {
      whitelistPatterns: [
        /^bg-/,
        /^text-/,
        /^!/,
        /^border-/,
        /^max-/,
        /^min-w-lg/,
        /^hover:/,
        /^active:/,
        /^selected:/,
        /^dark:/,
      ], // Retain all classes starting with...
    },
  },
  theme: {
    darkSelector: ".mode-dark",
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",

      whiteAlpha: {
        50: "rgba(255, 255, 255, 0.04)",
        100: "rgba(255, 255, 255, 0.06)",
        200: "rgba(255, 255, 255, 0.08)",
        300: "rgba(255, 255, 255, 0.16)",
        400: "rgba(255, 255, 255, 0.24)",
        500: "rgba(255, 255, 255, 0.36)",
        600: "rgba(255, 255, 255, 0.48)",
        700: "rgba(255, 255, 255, 0.64)",
        800: "rgba(255, 255, 255, 0.80)",
        900: "rgba(255, 255, 255, 0.92)",
      },

      blackAlpha: {
        50: "rgba(0, 0, 0, 0.04)",
        100: "rgba(0, 0, 0, 0.06)",
        200: "rgba(0, 0, 0, 0.08)",
        300: "rgba(0, 0, 0, 0.16)",
        400: "rgba(0, 0, 0, 0.24)",
        500: "rgba(0, 0, 0, 0.36)",
        600: "rgba(0, 0, 0, 0.48)",
        700: "rgba(0, 0, 0, 0.64)",
        800: "rgba(0, 0, 0, 0.80)",
        900: "rgba(0, 0, 0, 0.92)",
      },

      gray: {
        50: "#F7FAFC",
        100: "#EDF2F7",
        200: "#E2E8F0",
        300: "#CBD5E0",
        400: "#A0AEC0",
        500: "#718096",
        600: "#4A5568",
        700: "#2D3748",
        800: "#1A202C",
        900: "#171923",
      },

      red: {
        50: "#fff5f5",
        100: "#fed7d7",
        200: "#feb2b2",
        300: "#fc8181",
        400: "#f56565",
        500: "#e53e3e",
        600: "#c53030",
        700: "#9b2c2c",
        800: "#822727",
        900: "#63171b",
      },

      orange: {
        50: "#FFFAF0",
        100: "#FEEBC8",
        200: "#FBD38D",
        300: "#F6AD55",
        400: "#ED8936",
        500: "#DD6B20",
        600: "#C05621",
        700: "#9C4221",
        800: "#7B341E",
        900: "#652B19",
      },

      yellow: {
        50: "#fffff0",
        100: "#fefcbf",
        200: "#faf089",
        300: "#f6e05e",
        400: "#ecc94b",
        500: "#d69e2e",
        600: "#b7791f",
        700: "#975a16",
        800: "#744210",
        900: "#5F370E",
      },

      green: {
        50: "#f0fff4",
        100: "#c6f6d5",
        200: "#9ae6b4",
        300: "#68d391",
        400: "#48bb78",
        500: "#38a169",
        600: "#2f855a",
        700: "#276749",
        800: "#22543d",
        900: "#1C4532",
      },

      teal: {
        50: "#E6FFFA",
        100: "#B2F5EA",
        200: "#81E6D9",
        300: "#4FD1C5",
        400: "#38B2AC",
        500: "#319795",
        600: "#2C7A7B",
        700: "#285E61",
        800: "#234E52",
        900: "#1D4044",
      },

      blue: {
        50: "#ebf8ff",
        100: "#ceedff",
        200: "#90cdf4",
        300: "#63b3ed",
        400: "#4299e1",
        500: "#3182ce",
        600: "#2a69ac",
        700: "#1e4e8c",
        800: "#153e75",
        900: "#1a365d",
      },

      cyan: {
        50: "#EDFDFD",
        100: "#C4F1F9",
        200: "#9DECF9",
        300: "#76E4F7",
        400: "#0BC5EA",
        500: "#00B5D8",
        600: "#00A3C4",
        700: "#0987A0",
        800: "#086F83",
        900: "#065666",
      },

      purple: {
        50: "#faf5ff",
        100: "#e9d8fd",
        200: "#d6bcfa",
        300: "#b794f4",
        400: "#9f7aea",
        500: "#805ad5",
        600: "#6b46c1",
        700: "#553c9a",
        800: "#44337a",
        900: "#322659",
      },

      pink: {
        50: "#fff5f7",
        100: "#fed7e2",
        200: "#fbb6ce",
        300: "#f687b3",
        400: "#ed64a6",
        500: "#d53f8c",
        600: "#b83280",
        700: "#97266d",
        800: "#702459",
        900: "#521B41",
      },
    },
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

    accessibility: [],
    alignContent: [],
    alignItems: [],
    alignSelf: [],
    appearance: [],
    backgroundAttachment: [], 
    backgroundPosition: [],
    backgroundRepeat: [],
    backgroundSize: [],
    borderCollapse: [],
    borderOpacity: ["dark"],
    borderRadius: [],
    borderStyle: [],
    boxSizing: [],
    clear: [],
    divideColor: [],
    divideOpacity: [],
    divideWidth: [],
    fill: [],
    float: [],
    gap: [],
    gridAutoFlow: [],
    gridColumn: [],
    gridColumnEnd: [],
    gridColumnStart: [],
    gridRow: [],
    gridRowEnd: [],
    gridRowStart: [],
    gridTemplateColumns: [],
    gridTemplateRows: [],
    resize: [],
    rotate: [],
    scale: [],
    skew: [],
    stroke: [],
    strokeWidth: [],
    tableLayout: [],
  },
  plugins: [
    darkMode(),
    function ({ addVariant }) {
      addVariant("important", ({ container }) => {
        container.walkRules((rule) => {
          rule.selector = `.\\!${rule.selector.slice(1)}`;
          rule.walkDecls((decl) => {
            decl.important = true;
          });
        });
      });
    },
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
