import * as React from "react";
import { memo } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import { IconButton } from "@chakra-ui/core";
import { Download as DownloadIcon } from "icons";
import rawTemplate from "templates/default/raw";
import saveJsZip from "saveJsZip";

export const Download = memo(({ className }) => {
  const handleDownload = async () => {
    const { file } = await saveJsZip.create(rawTemplate);
    const content = await JSZip.loadAsync(file);

    console.log({ file, content });
    saveAs(file, "template.zip");
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
      <DownloadIcon size={18} />
    </IconButton>
  );
});
