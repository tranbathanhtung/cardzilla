import * as React from "react";
import { memo } from "react";

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "components";

import { ProfileForm } from "./ProfileForm";
import { ContactForm } from "./ContactForm";
import { GithubForm } from "./GithubForm";
import { ArticleForm } from "./ArticleForm";

const tabClass =
  "inline-flex appearance-none items-center justify-center transition-all duration-200 select-none relative whitespace-no-wrap align-middle leading-tight outline-none focus:outline-none h-10 min-w-10 text-base px-4 focus:shadow-outline selected:bg-gray-100 active:bg-gray-300 dark:selected:bg-whiteAlpha-200 dark:active:bg-whiteAlpha-400 outline-none focus:outline-none cursor-pointer focus:z-10 disabled:opacity-40 disabled:cursor-not-allowed text-base py-4 flex-1 font-semibold rounded-md";

const onClose = () => {};

export const SettingDrawer = memo((props) => {
  return (
    <div className="w-full h-full p-6">
      <Tabs isFitted variant="unstyle">
        <TabList>
          <Tab className={tabClass}>Profile</Tab>
          <Tab className={tabClass}>Github</Tab>
          <Tab className={tabClass}>Articles</Tab>
          <Tab className={tabClass}>Contact</Tab>
        </TabList>

        <TabPanels className="my-6">
          <TabPanel className="focus:outline-none">
            <ProfileForm onClose={onClose} />
          </TabPanel>
          <TabPanel className="focus:outline-none">
            <GithubForm onClose={onClose} />
          </TabPanel>
          <TabPanel className="focus:outline-none">
            <ArticleForm onClose={onClose} />
          </TabPanel>
          <TabPanel className="focus:outline-none">
            <ContactForm onClose={onClose} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
});
