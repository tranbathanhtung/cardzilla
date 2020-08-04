/* eslint-disable */
import templateStr from "!raw-loader!./index";
// import schemaStr from "!raw-loader!data/schema";
// import recoilStr from "!raw-loader!data/template";

import ContactStackStr from "!raw-loader!./Stacks/ContactStack";
import DetailStackContainerStr from "!raw-loader!./Stacks/DetailStackContainer";
import ArticleStackStr from "!raw-loader!./Stacks/ArticleStack";
import GithubStackStr from "!raw-loader!./Stacks/GithubStack";
import ProfileStackStr from "!raw-loader!./Stacks/ProfileStack";
import StacksStr from "!raw-loader!./Stacks";

import StackContextStr from "!raw-loader!./context/Stack";
 
export default [
  {
    title: "/src/Template.js",
    type: "file",
    source: templateStr,
  },
  {
    title: "/src/data/schema.js",
    type: "file",
    // source: schemaStr,
  },
  {
    title: "/src/data/template.js",
    type: "file",
    // source: recoilStr,
  },

  // Stacks folder
  {
    title: "/src/Stacks/index.js",
    type: "file",
    source: StacksStr,
  },
  {
    title: "/src/Stacks/ProfileStack.js",
    type: "file",
    source: ProfileStackStr,
  },
  {
    title: "/src/Stacks/GithubStack.js",
    type: "file",
    source: GithubStackStr,
  },
  {
    title: "/src/Stacks/ArticleStack.js",
    type: "file",
    source: ArticleStackStr,
  },
  {
    title: "/src/Stacks/DetailStackContainer.js",
    type: "file",
    source: DetailStackContainerStr,
  },
  {
    title: "/src/Stacks/ContactStack.js",
    type: "file",
    source: ContactStackStr,
  },
  // context
  {
    title: "/src/context/Stack.js",
    type: "file",
    source: StackContextStr,
  },
];