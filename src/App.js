import React, { useMemo } from "react";

import { DefaultTemplate } from "templates";
// import template from "fixtures/default";
import { SettingDrawer } from "./common/SettingDrawer";
import { Download } from "./common/Download";

const template = { name: "default" }

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
    <div className="flex relative w-screen h-screen">
      {/* <div className="space-x-4 absolute top-4 right-4">
        <Download />
        <SettingDrawer />
      </div> */}
      <div className="flex">

      </div>
      <div className="flex flex-1 bg-gray-50 dark:bg-gray-800 items-center justify-center">
        {TemplateChild}
      </div>
      <div className="flex bg-white dark:bg-gray-900 border-l border-solid border-gray-100 dark:border-gray-800 w-md overflow-y-auto overflow-x-hidden">
        <SettingDrawer />
      </div>
    </div>
  );
}

export default App;
