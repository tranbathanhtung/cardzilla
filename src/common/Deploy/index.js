import * as React from "react";
import { memo } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { UploadCloud } from "react-feather";

import { IconButton } from "components";
import rawTemplate from "templates/default/raw";
import rawApp from "data/raw";
import saveJsZip from "saveJsZip";

export const Deploy = memo(({ className }) => {
  const handleDownload = async () => {
    const raw = [...rawApp, ...rawTemplate];
    const { file } = await saveJsZip.create(raw);
    const content = await JSZip.loadAsync(file);

    console.log({ file, content });
    saveAs(file, "cardzilla-template.zip");
  };
  return (
    <IconButton
      size="md"
      variantColor="gray"
      variant="solid"
      aria-label="Settings"
      className={className}
      onClick={handleDownload}
    >
      <UploadCloud size={18} />
    </IconButton>
  );
});
