import * as React from "react";
import { memo } from "react";

import { Download } from "common/Download";
import { DeployButton } from "common/DeployButton";
import { GithubLogin } from "common/GithubLogin";
import { ThemeSwitcher } from "common/ThemeSwitcher";
import { ColorPicker } from "common/ColorPicker";
import { Settings } from "common/Settings";

export const Header = memo(() => {
  return (
    <header className="h-16 bg-gray-100 dark:bg-gray-900 border-b border-solid border-gray-200 dark:border-gray-700">
      <div className="w-full h-full flex flex-no-wrap justify-between items-center px-4 py-3 space-x-4 overflow-x-auto">
        <div className="flex items-center space-x-4">
          <GithubLogin />
          <Download />
          <Settings />
          <DeployButton />
        </div>
        <div className="flex items-center space-x-4">
          <ColorPicker />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
});
