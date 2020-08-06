import { atom } from "recoil";

export const workspace = atom({
  key: "workspace.state",
  default: "",
});