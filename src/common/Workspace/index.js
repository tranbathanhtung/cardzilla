import React, { memo, useMemo } from "react";
import { useRecoilValue, useRecoilState } from "recoil";

import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "components";
import { SettingDrawer } from "common/SettingDrawer";
import { Deployment } from "common/Deployment";
import { ConditionalWrap } from "common/ConditionalWrap";
import { useWindowSize } from "hooks/useWindowSize";

import * as S from "selectors";

export const Workspace = memo(() => {
  const { width } = useWindowSize();
  const schema = useRecoilValue(S.schemaState);
  const [workspace, setWorkspace] = useRecoilState(S.workspace);

  const Workspace = useMemo(() => {
    if (!schema) return null;
    switch (workspace) {
      case "template.config":
        return <SettingDrawer />;
      case "template.deploy":
        return <Deployment />;
      default:
        return null;
    }
  }, [schema, workspace]);

  const handleClose = () => setWorkspace("");

  return (
    <>
      {workspace && (
        <ConditionalWrap
          condition={width <= 640}
          whenTrue={(child) => (
            <Drawer isOpen={true} placement="right" size="full">
              <DrawerOverlay className="z-10" onDismiss={handleClose}>
                <DrawerContent className="z-20">
                  <DrawerCloseButton onClick={handleClose} />
                  <div className="flex bg-gray-100 dark:bg-gray-900 w-full h-full overflow-y-auto overflow-hidden">
                    {child}
                  </div>
                </DrawerContent>
              </DrawerOverlay>
            </Drawer>
          )}
          whenFalse={(child) => (
            <div className="flex bg-gray-100 dark:bg-gray-900 w-md overflow-y-auto overflow-hidden">
              {child}
            </div>
          )}
        >
          {Workspace}
        </ConditionalWrap>
      )}
    </>
  );
});
