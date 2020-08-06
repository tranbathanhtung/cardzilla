import * as React from "react";
import { memo } from "react";
import { UploadCloud } from "react-feather";
import { useRecoilState, useRecoilValue } from "recoil";

import { IconButton } from "components";
import * as S from "selectors";

export const DeployButton = memo(() => {
  const user = useRecoilValue(S.user);
  const [workspace, setWorkspace] = useRecoilState(S.workspace);

  const handleWorkspace = () => {
    if (workspace === "template.deploy") setWorkspace("");
    else setWorkspace("template.deploy");
  }

  return (
    <IconButton
      size="md"
      variantColor="gray"
      variant="solid"
      aria-label="Deploy"
      title="Deploy"
      className="bg-gray-300"
      onClick={handleWorkspace}
      isDisabled={!user}
    >
      <UploadCloud size={18} />
    </IconButton>
  );
});
