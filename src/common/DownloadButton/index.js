import * as React from "react";
import { memo } from "react";
import { saveAs } from "file-saver";
import { Download as DownloadIcon } from "react-feather";
import { useRecoilValue } from "recoil";

import { IconButton } from "components";
import getDefaultTemplate from "templates/default/default-template";
import getCreateReactApp from "fixtures/create-react-app";
import saveJsZip from "services/saveJsZip";
import * as S from "selectors";

export const DownloadButton = memo(() => {
  const schema = useRecoilValue(S.schemaState);
  const theme = useRecoilValue(S.theme);
  const handleDownload = async () => {
    const createReactApp = getCreateReactApp({ theme, title: schema?.title, trackingId: schema?.trackingId });
    const defaultTemplate = getDefaultTemplate(schema);
    const app = [...createReactApp, ...defaultTemplate];
    const { file } = await saveJsZip.create(app);
    saveAs(file, "cardzilla-template.zip");
  };
  
  return (
    <IconButton
      size="md"
      variantColor="gray"
      variant="solid"
      aria-label="Download"
      title="Download"
      className="bg-gray-300"
      onClick={handleDownload}
    >
      <DownloadIcon size={18} />
    </IconButton>
  );
});
