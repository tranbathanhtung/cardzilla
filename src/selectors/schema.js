import { atom, selector } from "recoil";

export const schemaState = atom({
  key: "schema.state",
  default: null,
});

export const profile = selector({
  key: "profile",
  get: ({ get }) => {
    const schema = get(schemaState);
    if (!schema) return {};
    return schema.config.profile;
  },
  set: ({ get, set }, profile) => {
    const schema = get(schemaState);
    const newSchema = {
      ...schema,
      config: {
        ...schema.config,
        profile,
      },
    };

    set(schemaState, newSchema);
  },
});

export const github = selector({
  key: "github",
  get: ({ get }) => {
    const schema = get(schemaState);
    if (!schema) return {};
    return schema.config.github;
  },
  set: ({ get, set }, github) => {
    const schema = get(schemaState);
    const newSchema = {
      ...schema,
      config: {
        ...schema.config,
        github,
      },
    };
    set(schemaState, newSchema);
  },
});

export const articles = selector({
  key: "articles",
  get: ({ get }) => {
    const schema = get(schemaState);
    if (!schema) return [];
    return schema.config.articles;
  },
  set: ({ get, set }, articles) => {
    const schema = get(schemaState);
    const newSchema = {
      ...schema,
      config: {
        ...schema.config,
        articles,
      },
    };

    set(schemaState, newSchema);
  },
});

export const contact = selector({
  key: "contact",
  get: ({ get }) => {
    const schema = get(schemaState);
    if (!schema) return {};
    return schema.config.contact;
  },
  set: ({ get, set }, contact) => {
    const schema = get(schemaState);
    const newSchema = {
      ...schema,
      config: {
        ...schema.config,
        contact,
      },
    };

    set(schemaState, newSchema);
  },
});

export const color = selector({
  key: "color",
  get: ({ get }) => {
    const schema = get(schemaState);
    if (!schema) return "gray";
    return schema.color;
  },
  set: ({ get, set }, color) => {
    const schema = get(schemaState);
    const newSchema = {
      ...schema,
      color,
    };

    set(schemaState, newSchema);
  },
});

export const theme = selector({
  key: "theme",
  get: ({ get }) => {
    const schema = get(schemaState);
    if (!schema) return "light";
    return schema.theme;
  },
  set: ({ get, set }, theme) => {
    const schema = get(schemaState);
    const newSchema = {
      ...schema,
      theme,
    };

    set(schemaState, newSchema);
    if (theme === "dark") {
      document.body.classList.add("mode-dark");
      document.body.classList.remove("mode-light");
    } else {
      document.body.classList.add("mode-light");
      document.body.classList.remove("mode-dark");
    }
  },
});
