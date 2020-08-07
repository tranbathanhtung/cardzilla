import * as React from "react";
import { memo } from "react";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "components";

import { ProfileForm } from "./ProfileForm";
import { ContactForm } from "./ContactForm";
import { GithubForm } from "./GithubForm";
import { ArticleForm } from "./ArticleForm";

const tabClass =
  "inline-flex appearance-none items-center justify-center transition-all duration-200 select-none relative whitespace-no-wrap align-middle leading-tight outline-none focus:outline-none h-10 min-w-10 text-base px-4 focus:shadow-outline selected:bg-gray-300 active:bg-gray-300 dark:selected:bg-whiteAlpha-200 dark:active:bg-whiteAlpha-400 outline-none focus:outline-none cursor-pointer focus:z-10 disabled:opacity-40 disabled:cursor-not-allowed text-base py-4 flex-1 font-semibold rounded-md";

export const SettingDrawer = memo((props) => {
  return (
    <div className="w-full h-full">
      <Tabs isFitted variant="unstyle">
        <TabList className="h-16 px-4 py-3 border-b border-l border-solid border-gray-200 dark:border-gray-700">
          <Tab className={tabClass}>Profile</Tab>
          <Tab className={tabClass}>Github</Tab>
          <Tab className={tabClass}>Articles</Tab>
          <Tab className={tabClass}>Contact</Tab>
        </TabList>

        <TabPanels className="my-6 px-6 py-5">
          <TabPanel className="focus:outline-none">
            <ProfileForm />
          </TabPanel>
          <TabPanel className="focus:outline-none">
            <GithubForm />
          </TabPanel>
          <TabPanel className="focus:outline-none">
            <ArticleForm />
          </TabPanel>
          <TabPanel className="focus:outline-none">
            <ContactForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
});
