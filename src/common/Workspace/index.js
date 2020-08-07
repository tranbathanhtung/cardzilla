import React, { memo, useMemo } from "react";
import { useRecoilValue, useRecoilState } from "recoil";

import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
} from "components";
import { SettingDrawer } from "common/SettingDrawer";
import { Deployment } from "common/Deployment";
import { useWindowSize } from "hooks/useWindowSize";
import { WORKSPACE } from "constants/workspace";
import * as S from "selectors";

export const Workspace = memo(() => {
  const { width } = useWindowSize();
  const schema = useRecoilValue(S.schemaState);
  const [workspace, setWorkspace] = useRecoilState(S.workspace);

  const Workspace = useMemo(() => {
    if (!schema) return null;
    switch (workspace) {
      case WORKSPACE.SETTINGS:
        return <SettingDrawer />;
      case WORKSPACE.DEPLOYMENT:
        return <Deployment />;
      default:
        return null;
    }
  }, [schema, workspace]);

  const handleClose = () => setWorkspace("");

  if (!workspace) return null;

  if (width <= 640) {
    return (
      <Drawer isOpen={true} placement="right" size="full">
        <DrawerOverlay className="z-10" onDismiss={handleClose}>
          <DrawerContent className="z-20">
            <div className="flex flex-col bg-gray-100 dark:bg-gray-900 w-full h-full overflow-y-auto overflow-hidden">
              <DrawerHeader>Default Template</DrawerHeader>
              <DrawerCloseButton onClick={handleClose} />
              {Workspace}
            </div>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 w-md overflow-y-auto overflow-hidden">
      {Workspace}
    </div>
  );
});
