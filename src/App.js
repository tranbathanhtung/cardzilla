import * as React from "react";

import { DefaultTemplate } from "templates";
import { Header } from "common/Header";
import { Workspace } from "common/Workspace";

function App() {
  // TODO: more templates ?
  // const TemplateChild = useMemo(() => {
  //   switch (template?.name) {
  //     case "default":
  //       return <DefaultTemplate />;
  //     default:
  //       return null;
  //   }
  // }, [template]);

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <div className="w-full h-full flex-1">
        <Header />
        <div
          style={{ height: "calc(100vh - 4rem)" }}
          className="flex flex-wrap p-0 md:p-5 bg-gray-50 dark:bg-gray-800 overflow-y-auto overflow-x-hidden"
        >
          <DefaultTemplate />
        </div>
      </div>
      <Workspace />
    </div>
  );
}

export default App;
