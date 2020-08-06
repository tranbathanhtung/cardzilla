import * as React from "react";

import { StackController } from "./context/Stack";
import { ProfileStack, DetailStackContainer } from "./Stacks";

const Template = () => {
  return (
    <div
      className="w-full h-full max-w-full md:max-w-md md:w-md md:h-3xl bg-white dark:bg-gray-700 rounded-md shadow-lg relative overflow-hidden prose prose-sm sm:prose dark:typography:prose-dark m-auto"
    >
      <StackController>
        <ProfileStack />
        <DetailStackContainer />
      </StackController>
    </div>
  );
};

export default Template;
