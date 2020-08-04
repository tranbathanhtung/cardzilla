export default {
  create(template) {
    return import(
      /* webpackChunkName: 'saveJsZip' */ "./saveJsZip"
    ).then((module) =>
      module.saveJsZip(template).then((result) => ({ file: result.file }))
    );
  },
};
