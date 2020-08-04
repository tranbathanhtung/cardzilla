import JSZip from "jszip";

export const BLOB_ID = "blob-url://";

export async function createFile(file, zip, downloadBlobs = true) {
  return zip.file(file.title, file.source);
}

async function createZip(template) {
  const zip = new JSZip();

  await Promise.all(template.map((x) => createFile(x, zip, true)));

  const file = await zip.generateAsync({ type: "blob" });

  return file;
}

export async function saveJsZip(template) {
  const file = await createZip(template);

  return { file };
}
