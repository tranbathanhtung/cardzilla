import React, { useMemo } from "react";
import { useRecoilValue } from "recoil";

import { DefaultTemplate } from "templates";
import { Header } from "common/Header";
import { SettingDrawer } from "common/SettingDrawer";
import { Deploy } from "common/Deploy";
import * as S from "data";

function App() {
  const schema = useRecoilValue(S.schemaState);
  const workspace = useRecoilValue(S.workspace);

  // TODO: For multiple template
  // const TemplateChild = useMemo(() => {
  //   switch (template?.name) {
  //     case "default":
  //       return <DefaultTemplate />;
  //     default:
  //       return null;
  //   }
  // }, [template]);

  const Workspace = useMemo(() => {
    if (!schema) return null;
    switch (workspace) {
      case "template.config":
        return <SettingDrawer />;
      case "template.deploy":
        return <Deploy />;
      default:
        return null;
    }
  }, [schema, workspace])

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <div className="w-full h-full flex-1">
        <Header />
        <div
          style={{ height: "calc(100vh - 4rem)" }}
          className="flex flex-wrap p-5 bg-gray-50 dark:bg-gray-800 overflow-y-auto overflow-x-hidden"
        >
          <DefaultTemplate />
        </div>
      </div>
      {workspace && (
        <div className="flex bg-gray-100 dark:bg-gray-900 w-md overflow-y-auto overflow-x-hidden">
          {Workspace}
        </div>
      )}
    </div>
  );
}

export default App;
