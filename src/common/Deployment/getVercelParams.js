export async function getVercelParams(contents, name) {
  let params = {
    name,
    target: "production",
    alias: name,
    public: false,
    files: [],
    version: 2,
    projectSettings: {
      framework: "create-react-app",
      buildCommand: "npm run build",
      devCommand: "react-scripts start",
      outputDirectory: "build",
    },
  };

  const filePaths = Object.keys(contents.files);
  const projectPackage = contents.files["/package.json"];
  const packageText = await projectPackage.async("text");
  params.files.push({
    file: "package.json",
    data: packageText,
  });

  for (let i = 0; i < filePaths.length; i += 1) {
    const filePath = filePaths[i];
    const file = contents.files[filePath];

    if (!file.dir && filePath !== "/package.json") {
      const data = await file.async("base64"); // eslint-disable-line no-await-in-loop

      params.files.push({ file: filePath, data, encoding: "base64" });
    }
  }

  return params;
}
