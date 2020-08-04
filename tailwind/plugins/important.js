function important({ addVariant }) {
  addVariant("important", ({ container }) => {
    container.walkRules((rule) => {
      rule.selector = `.\\!${rule.selector.slice(1)}`;
      rule.walkDecls((decl) => {
        decl.important = true;
      });
    });
  });
}

module.exports = important;
