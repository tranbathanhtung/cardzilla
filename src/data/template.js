import { atom, selector } from "recoil";
import template from "./schema";

export const templateState = atom({
  key: "template.state",
  default: template,
});

export const profile = selector({
  key: "profile",
  get: ({ get }) => {
    const template = get(templateState);
    return template.config.profile;
  },
  set: ({ get, set }, profile) => {
    const template = get(templateState);
    const newTemplate = {
      ...template,
      config: {
        ...template.config,
        profile
      },
    };

    set(templateState, newTemplate);
  },
});

export const github = selector({
  key: "github",
  get: ({ get }) => {
    const template = get(templateState);
    return template.config.github;
  },
  set: ({ get, set }, github) => {
    const template = get(templateState);
    const newTemplate = {
      ...template,
      config: {
        ...template.config,
        github
      },
    };

    set(templateState, newTemplate);
  },
});

export const articles = selector({
  key: "articles",
  get: ({ get }) => {
    const template = get(templateState);
    return template.config.articles;
  },
  set: ({ get, set }, articles) => {
    const template = get(templateState);
    const newTemplate = {
      ...template,
      config: {
        ...template.config,
        articles
      },
    };

    set(templateState, newTemplate);
  },
});


export const contact = selector({
  key: "contact",
  get: ({ get }) => {
    const template = get(templateState);
    return template.config.contact;
  },
  set: ({ get, set }, contact) => {
    const template = get(templateState);
    const newTemplate = {
      ...template,
      config: {
        ...template.config,
        contact
      },
    };

    set(templateState, newTemplate);
  },
});
