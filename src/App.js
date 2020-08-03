import React, { useMemo } from "react";

import { DefaultTemplate } from "templates";
// import template from "fixtures/default";
import { SettingDrawer } from "./common/SettingDrawer";
import { Download } from "./common/Download";
import { Deploy } from "./common/Deploy";
import { GithubLogin } from "./common/GithubLogin";

const template = { name: "default" };

function App() {
  const TemplateChild = useMemo(() => {
    switch (template.name) {
      case "default":
        return <DefaultTemplate />;
      default:
        return null;
    }
  }, []);

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      {/* <div className="space-x-4 absolute top-4 right-4">
        <Download />
        <SettingDrawer />
      </div> */}
      <div className="w-full h-full flex-1">
        <header className="h-16 bg-gray-700 dark:bg-gray-900">
          <div className="w-full h-full flex justify-between items-center px-4 py-3">
            <div></div>
            <div className="flex space-x-4">
              <Download />
              <Deploy />
              <GithubLogin />
            </div>
          </div>
        </header>
        <div
          style={{ height: "calc(100vh - 4rem)" }}
          className="flex flex-1 bg-gray-50 dark:bg-gray-800 items-center justify-center"
        >
          {TemplateChild}
        </div>
      </div>
      <div className="flex bg-white dark:bg-gray-900 border-l border-solid border-gray-100 dark:border-gray-800 w-md overflow-y-auto overflow-x-hidden">
        <SettingDrawer />
      </div>
    </div>
  );
}

export default App;
