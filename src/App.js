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
    <div className="flex bg-gray-50 relative w-screen h-screen items-center justify-center">
      <div className="space-x-4 absolute top-4 right-4">
        <Download />
        <SettingDrawer />
      </div>
      {TemplateChild}
    </div>
  );
}

export default App;
