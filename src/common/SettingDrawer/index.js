import * as React from "react";
import { memo } from "react";
// import { Settings } from "react-feather";

import {
  // IconButton,
  // Drawer,
  // DrawerOverlay,
  // DrawerContent,
  // DrawerHeader,
  // DrawerBody,
  // DrawerFooter,
  // DrawerCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "components";
// import { useDisclosure } from "hooks/useDisclosure";

import { ProfileForm } from "./ProfileForm";
import { ContactForm } from "./ContactForm";
import { GithubForm } from "./GithubForm";
import { ArticleForm } from "./ArticleForm";
// import { TemplateForm } from "./TemplateForm";

const tabClass =
  "inline-flex appearance-none items-center justify-center transition-all duration-200 select-none relative whitespace-no-wrap align-middle leading-tight outline-none focus:outline-none h-10 min-w-10 text-base px-4 focus:shadow-outline selected:bg-gray-100 active:bg-gray-300 dark:selected:bg-whiteAlpha-200 dark:active:bg-whiteAlpha-400 outline-none focus:outline-none cursor-pointer focus:z-10 disabled:opacity-40 disabled:cursor-not-allowed text-base py-4 flex-1 font-semibold rounded-md";

// export const SettingDrawer = memo((props) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const btnRef = useRef();

//   return (
//     <>
//       <IconButton
//         size="md"
//         variantColor="gray"
//         variant="solid"
//         aria-label="Settings"
//         ref={btnRef}
//         onClick={onOpen}
//         {...props}
//       >
//         <Settings size={18} />
//       </IconButton>
//       <Drawer
//         isOpen={isOpen}
//         placement="right"
//         finalFocusRef={btnRef}
//         size="md"
//       >
//         <DrawerOverlay isOpen={isOpen} className="z-10" onDismiss={onClose}>
//           <DrawerContent
//             className="z-20"
//             sectionClass="overflow-y-auto"
//             aria-label="setting"
//           >
//             <DrawerCloseButton onClick={onClose} />
//             <DrawerHeader>Template Settings</DrawerHeader>

//             <DrawerBody>

//               <Tabs isFitted variant="unstyle">
//                 <TabList>
//                   <Tab className={tabClass}>Template</Tab>
//                   <Tab className={tabClass}>Profile</Tab>
//                   <Tab className={tabClass}>Github</Tab>
//                   <Tab className={tabClass}>Dev</Tab>
//                   <Tab className={tabClass}>Contact</Tab>
//                 </TabList>

//                 <TabPanels className="my-6">
//                   <TabPanel>
//                     <TemplateForm onClose={onClose} />
//                   </TabPanel>
//                   <TabPanel>
//                     <ProfileForm onClose={onClose} />
//                   </TabPanel>
//                   <TabPanel>
//                     <GithubForm onClose={onClose} />
//                   </TabPanel>
//                   <TabPanel>
//                     <ArticleForm onClose={onClose} />
//                   </TabPanel>
//                   <TabPanel>
//                     <ContactForm onClose={onClose} />
//                   </TabPanel>
//                 </TabPanels>
//               </Tabs>
//             </DrawerBody>

//             <DrawerFooter></DrawerFooter>
//           </DrawerContent>
//         </DrawerOverlay>
//       </Drawer>
//     </>
//   );
// });

const onClose = () => {};

export const SettingDrawer = memo((props) => {
  return (
    <div className="w-full h-full p-6">
      <Tabs isFitted variant="unstyle">
        <TabList>
          {/* <Tab className={tabClass}>Template</Tab> */}
          <Tab className={tabClass}>Profile</Tab>
          <Tab className={tabClass}>Github</Tab>
          <Tab className={tabClass}>Articles</Tab>
          <Tab className={tabClass}>Contact</Tab>
        </TabList>

        <TabPanels className="my-6">
          {/* <TabPanel className="focus:outline-none">
            <TemplateForm onClose={onClose} />
          </TabPanel> */}
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
