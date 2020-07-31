import React, { useMemo } from "react";

import { DefaultTemplate } from "templates";
// import template from "fixtures/default";
import { SettingDrawer } from "./common/SettingDrawer";

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
    <div className="bg-gray-50 relative w-screen h-screen flex items-center justify-center">
      <SettingDrawer className="absolute top-4 right-4" />
      {TemplateChild}
    </div>
  );
}

export default App;
