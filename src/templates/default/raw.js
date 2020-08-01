/* eslint-disable */
import templateStr from "!raw-loader!./index";
import schemaStr from "!raw-loader!data/schema";
import recoilStr from "!raw-loader!data/template";

import ContactStackStr from "!raw-loader!./Stacks/ContactStack";
import DetailStackContainerStr from "!raw-loader!./Stacks/DetailStackContainer";
import DevStackStr from "!raw-loader!./Stacks/DevStack";
import GithubStackStr from "!raw-loader!./Stacks/GithubStack";
import StacksStr from "!raw-loader!./Stacks";

import StackContextStr from "!raw-loader!./context/Stack";
 
export default [
  {
    title: "/Template.js",
    type: "file",
    source: templateStr,
  },
  {
    title: "/schema.js",
    type: "file",
    source: schemaStr,
  },
  {
    title: "/recoil.js",
    type: "file",
    source: recoilStr,
  },

  // Stacks folder
  {
    title: "/Stacks/index.js",
    type: "file",
    source: StacksStr,
  },
  {
    title: "/Stacks/GithubStack.js",
    type: "file",
    source: GithubStackStr,
  },
  {
    title: "/Stacks/DevStack.js",
    type: "file",
    source: DevStackStr,
  },
  {
    title: "/Stacks/DetailStackContainer.js",
    type: "file",
    source: DetailStackContainerStr,
  },
  {
    title: "/Stacks/ContactStack.js",
    type: "file",
    source: ContactStackStr,
  },

  // context
  {
    title: "/context/Stack.js",
    type: "file",
    source: StackContextStr,
  },

  // App
  {
    title: "/index.js",
    type: "file",
    source: ``,
  },
  {
    title: "/package.json",
    type: "file",
    source:`{
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
        "react-scripts": "3.4.1",
        "react-spring": "^8.0.27",
        "recoil": "^0.0.10"
      },
      "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "watch:css": "postcss src/styles/tailwind.css -o src/styles/index.css -w",
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
        "postcss-cli": "^7.1.1",
        "tailwindcss": "^1.5.2"
      }
    }`,
  }
];