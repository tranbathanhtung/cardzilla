/* eslint-disable */
import tailwindConfigStr from "!raw-loader!./tailwind";
import cssStr from "!raw-loader!../index.css";

import utilsStr from "!raw-loader!components/utils";
import IconButtonStr from "!raw-loader!components/IconButton";
import ButtonStr from "!raw-loader!components/Button";
import stylesButtonStr from "!raw-loader!components/Button/styles";
import DividerStr from "!raw-loader!components/Divider";
import LinkStr from "!raw-loader!components/Link";
import ButtonGroupStr from "!raw-loader!components/ButtonGroup";
import AvatarStr from "!raw-loader!components/Avatar";
import stylesAvatarStr from "!raw-loader!components/Avatar/styles";
import ImageStr from "!raw-loader!components/Image";
import BadgeStr from "!raw-loader!components/Badge";
import stylesBadgeStr from "!raw-loader!components/Badge/styles";
import TagStr from "!raw-loader!components/Tag";
import SpinnerStr from "!raw-loader!components/Spinner";
import VisuallyHiddenStr from "!raw-loader!components/VisuallyHidden";

import ForkStr from "!raw-loader!icons/fork";
import HeartStr from "!raw-loader!icons/heart";
import NewsStr from "!raw-loader!icons/news";
import PeopleStr from "!raw-loader!icons/people";
import StarStr from "!raw-loader!icons/star";
import IconStr from "!raw-loader!icons";

// fake a CRA
export default function getCreateReactApp({
  title = "",
  description = "",
  theme = "light",
  trackingId = "",
}) {
  const themeClass = theme === "dark" ? "mode-dark" : "mode-light";
  return [
    // =============== COMPONENTS =================
    {
      title: "/src/components/index.js",
      type: "file",
      source: `export { default as Avatar } from "./Avatar";
export { default as Image } from "./Image";
export { default as Link } from "./Link";
export { default as Divider } from "./Divider";
export { default as IconButton } from "./IconButton";
export { default as Button } from "./Button";
export { default as ButtonGroup } from "./ButtonGroup";
export { default as Badge } from "./Badge";
export { default as Tag } from "./Tag";
export * from "./Tag";`,
    },
    {
      title: "/src/components/utils.js",
      type: "file",
      source: utilsStr,
    },
    // Button
    {
      title: "/src/components/Button/index.js",
      type: "file",
      source: ButtonStr,
    },
    {
      title: "/src/components/Button/styles.js",
      type: "file",
      source: stylesButtonStr,
    },
    // IconButton
    {
      title: "/src/components/IconButton/index.js",
      type: "file",
      source: IconButtonStr,
    },
    // Divider
    {
      title: "/src/components/Divider/index.js",
      type: "file",
      source: DividerStr,
    },
    // Link
    {
      title: "/src/components/Link/index.js",
      type: "file",
      source: LinkStr,
    },
    // Link
    {
      title: "/src/components/ButtonGroup/index.js",
      type: "file",
      source: ButtonGroupStr,
    },
    // ButtonGroup
    {
      title: "/src/components/ButtonGroup/index.js",
      type: "file",
      source: ButtonGroupStr,
    },
    // Avatar
    {
      title: "/src/components/Avatar/index.js",
      type: "file",
      source: AvatarStr,
    },
    {
      title: "/src/components/Avatar/styles.js",
      type: "file",
      source: stylesAvatarStr,
    },
    // Image
    {
      title: "/src/components/Image/index.js",
      type: "file",
      source: ImageStr,
    },
    // Badge
    {
      title: "/src/components/Badge/index.js",
      type: "file",
      source: BadgeStr,
    },
    {
      title: "/src/components/Badge/styles.js",
      type: "file",
      source: stylesBadgeStr,
    },
    // Tag
    {
      title: "/src/components/Tag/index.js",
      type: "file",
      source: TagStr,
    },
    // Spinner
    {
      title: "/src/components/Spinner/index.js",
      type: "file",
      source: SpinnerStr,
    },
    // VisuallyHidden
    {
      title: "/src/components/VisuallyHidden/index.js",
      type: "file",
      source: VisuallyHiddenStr,
    },
    // =============== ICONS =================
    {
      title: "/src/icons/index.js",
      type: "file",
      source: IconStr,
    },
    {
      title: "/src/icons/fork.js",
      type: "file",
      source: ForkStr,
    },
    {
      title: "/src/icons/heart.js",
      type: "file",
      source: HeartStr,
    },
    {
      title: "/src/icons/news.js",
      type: "file",
      source: NewsStr,
    },
    {
      title: "/src/icons/people.js",
      type: "file",
      source: PeopleStr,
    },
    {
      title: "/src/icons/star.js",
      type: "file",
      source: StarStr,
    },
    // =============== APP =================
    {
      title: "/public/index.html",
      type: "file",
      source: `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="theme-color" content="#000000">
  <meta
    name="description"
    content=${description}
  />
  <!--
      manifest.json provides metadata used when your web app is added to the
      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
    -->
  <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
  <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
  <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the \`public\` folder during the build.
      Only files inside the \`public\` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running \`npm run build\`.
    -->
  <title>${title}</title>
</head>

<body class=${themeClass}>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
  <div id="root"></div>
  <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run \`npm start\` or \`yarn start\`.
      To create a production bundle, use \`npm run build\` or \`yarn build\`.
    -->
    ${trackingId ? `<script
    async
    src="https://www.googletagmanager.com/gtag/js?id=${trackingId}"
  ></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "${trackingId}");
  </script>` : ""}
</body>

</html>`,
    },
    {
      title: "/src/index.js",
      type: "file",
      source: `import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";

import App from "./App";
import "./index.css";
import "./styles/index.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  rootElement
);`,
    },
    {
      title: "/src/index.css",
      type: "file",
      source: cssStr,
    },
    {
      title: "/src/App.js",
      type: "file",
      source: `import * as React from "react";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import schema from "data/schema";
import * as S from "selectors/schema";

import Template from "./Template";

export default function App() {
  const setSchema = useSetRecoilState(S.schemaState);

  useEffect(() => {
    setSchema(schema);
  }, []);
  
  return (
    <div className="flex flex-wrap p-0 md:p-5 bg-gray-50 dark:bg-gray-800 relative w-screen h-screen overflow-y-auto overflow-x-hidden">
      <Template />
    </div>
  );
}`,
    },
    {
      title: "/src/styles/tailwind.css",
      type: "file",
      source: `@tailwind base;

@tailwind components;

@tailwind utilities;

@tailwind screens;`,
    },
    {
      title: "/tailwind.config.js",
      type: "file",
      source: tailwindConfigStr,
    },
    {
      title: "/postcss.config.js",
      type: "file",
      source: `//postcss.config.js
const tailwindcss = require("tailwindcss");
module.exports = {
  plugins: [tailwindcss("./tailwind.config.js"), require("autoprefixer")],
};`,
    },
    {
      title: "/jsconfig.json",
      type: "file",
      source: `{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}`,
    },
    {
      title: "/package.json",
      type: "file",
      source: `{
  "name": "cardzilla-template",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.3.2",
    "@testing-library/user-event": "^7.1.2",
    "classnames": "^2.2.6",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-feather": "^2.0.8",
    "react-scripts": "3.4.1",
    "react-spring": "^8.0.27",
    "recoil": "^0.0.10",
    "remark-parse": "^8.0.3",
    "remark-react": "^7.0.1",
    "unified": "^9.1.0"
  },
  "scripts": {
    "prestart": "postcss src/styles/tailwind.css -o src/styles/index.css",
    "start": "react-scripts start",
    "prebuild": "cross-env NODE_ENV=production postcss src/styles/tailwind.css -o src/styles/index.css",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.2.0",
    "autoprefixer": "^9.8.5",
    "cross-env": "^7.0.2",
    "postcss-cli": "^7.1.1",
    "postcss-selector-parser": "^6.0.2",
    "tailwindcss": "^1.6.0"
  }
}`,
    },
  ];
}
