export const normalizeUser = (user, vercel) => ({
  id: user.uid,
  displayName: user.displayName,
  photoURL: user.photoURL,
  vercel: vercel,
});

export const normalizeSchema = (userSchema, defaultSchema) => {
  const schema = userSchema || defaultSchema;

  if (schema.theme === "dark") {
    document.body.classList.add("mode-dark");
    document.body.classList.remove("mode-light");
  } else {
    document.body.classList.add("mode-light");
    document.body.classList.remove("mode-dark");
  }

  return {
    ...schema,
    config:
      typeof schema.config === "string"
        ? JSON.parse(schema.config)
        : schema.config,
  };
};