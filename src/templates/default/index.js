import * as React from "react";

import { StackController } from "./context/Stack";
import { ProfileStack, DetailStackContainer } from "./Stacks";

const Template = () => {
  return (
    <div className="w-md bg-white rounded-md shadow-lg relative overflow-hidden prose" style={{ height: 750 }}>
      <StackController>
        <ProfileStack />
        <DetailStackContainer />
      </StackController>
    </div>
  );
};

export default Template;
