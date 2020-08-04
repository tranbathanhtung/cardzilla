import * as React from "react";
import { memo } from "react";
import { Settings as SettingsIcon } from "react-feather";
import { useRecoilState } from "recoil";

import { IconButton } from "components";
import * as S from "selectors";

export const Settings = memo(() => {
  const [workspace, setWorkspace] = useRecoilState(S.workspace);
  const handleWorkspace = () => {
    if (workspace === "template.config") setWorkspace("");
    else setWorkspace("template.config");
  }
  
  return (
    <IconButton
      size="md"
      variantColor="gray"
      variant="solid"
      aria-label="Settings"
      className="bg-gray-300"
      onClick={handleWorkspace}
    >
      <SettingsIcon size={18} />
    </IconButton>
  );
});
