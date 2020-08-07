import * as React from "react";
import { memo } from "react";
import { Settings as SettingsIcon } from "react-feather";
import { useRecoilState } from "recoil";

import { IconButton } from "components";
import { WORKSPACE } from "constants/workspace";
import * as S from "selectors";

export const SettingButton = memo(() => {
  const [workspace, setWorkspace] = useRecoilState(S.workspace);
  const handleWorkspace = () => {
    if (workspace === WORKSPACE.SETTINGS) setWorkspace("");
    else setWorkspace(WORKSPACE.SETTINGS);
  }
  
  return (
    <IconButton
      size="md"
      variantColor="gray"
      variant="solid"
      aria-label="Settings"
      title="Settings"
      className="bg-gray-300"
      onClick={handleWorkspace}
    >
      <SettingsIcon size={18} />
    </IconButton>
  );
});
