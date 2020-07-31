export default {
  create(template) {
    return import(
      /* webpackChunkName: 'create-zip' */ "./create-zip"
    ).then((module) =>
      module
        .getZip(template)
        .then((result) => ({ file: result.file }))
    );
  },
};
