import * as React from "react";
import { useRef, memo } from "react";
import { Settings, Check } from "react-feather";

import {
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  RadioButtonGroup,
} from "components";
import { useDisclosure } from "hooks/useDisclosure";

import { ProfileForm } from "./ProfileForm";
import { ContactForm } from "./ContactForm";
import { GithubForm } from "./GithubForm";
import { ArticleForm } from "./ArticleForm";

const tabClass =
  "inline-flex appearance-none items-center justify-center transition-all duration-200 select-none relative whitespace-no-wrap align-middle leading-tight outline-none focus:outline-none h-10 min-w-10 text-base px-4 focus:shadow-outline selected:bg-gray-100 active:bg-gray-300 dark:selected:bg-whiteAlpha-200 dark:active:bg-whiteAlpha-400 outline-none focus:outline-none cursor-pointer focus:z-10 disabled:opacity-40 disabled:cursor-not-allowed text-base py-4 flex-1 font-semibold rounded-md";

const ButtonTheme = React.forwardRef((props, ref) => {
  const { isChecked, isDisabled, value, ...rest } = props;
  // const { color } = useTheme();

  return (
    <Button
      ref={ref}
      variantColor={isChecked ? "teal" : "gray"}
      aria-checked={isChecked}
      role="radio"
      isDisabled={isDisabled}
      size="md"
      {...rest}
    />
  );
});

const colors = [
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
];

const ButtonColor = React.forwardRef((props, ref) => {
  const { isChecked, isDisabled, value, ...rest } = props;

  return (
    <IconButton
      ref={ref}
      variantColor={value}
      aria-checked={isChecked}
      role="radio"
      isDisabled={isDisabled}
      size="sm"
      isRound
      {...rest}
    >
      {isChecked && <Check size={18} />}
    </IconButton>
  );
});

const ThemeSetting = memo(() => {
  // const { theme, setTheme } = useTheme();

  return (
    <div className="my-4 w-full h-full">
      <RadioButtonGroup
        defaultValue="light"
        onChange={() => {}}
        isInline={true}
        className="flex flex-no-wrap items-center"
      >
        <ButtonTheme
          aria-label="Theme Light"
          value="light"
          className="w-1/2 bg-gray-300"
        >
          Light
        </ButtonTheme>
        <ButtonTheme
          aria-label="Theme Dark"
          value="dark"
          className="w-1/2 bg-gray-300"
        >
          Dark
        </ButtonTheme>
      </RadioButtonGroup>
    </div>
  );
});

const ColorSetting = () => {
  // const { color, setColor } = useTheme();

  return (
    <div className="my-4 w-full h-full">
      <RadioButtonGroup
        className="flex"
        defaultValue="teal"
        onChange={() => {}}
        spacing={3}
        isInline
      >
        {colors.map((color) => (
          <ButtonColor value={color} key={color} />
        ))}
      </RadioButtonGroup>
    </div>
  );
};

export const SettingDrawer = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <IconButton
        size="md"
        variantColor="gray"
        variant="solid"
        aria-label="Settings"
        ref={btnRef}
        onClick={onOpen}
        {...props}
      >
        <Settings size={18} />
      </IconButton>
      <Drawer
        isOpen={isOpen}
        placement="right"
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay isOpen={isOpen} className="z-10" onDismiss={onClose}>
          <DrawerContent
            className="z-20"
            sectionClass="overflow-y-auto"
            aria-label="setting"
          >
            <DrawerCloseButton onClick={onClose} />
            <DrawerHeader>Template Settings</DrawerHeader>

            <DrawerBody>
              <div className="my-4">
                <ThemeSetting />
                <ColorSetting />
              </div>
              <Tabs isFitted variant="unstyle">
                <TabList>
                  <Tab className={tabClass}>Profile</Tab>
                  <Tab className={tabClass}>Github</Tab>
                  <Tab className={tabClass}>Dev</Tab>
                  <Tab className={tabClass}>Contact</Tab>
                </TabList>

                <TabPanels className="my-6">
                  <TabPanel>
                    <ProfileForm onClose={onClose} />
                  </TabPanel>
                  <TabPanel>
                    <GithubForm onClose={onClose} />
                  </TabPanel>
                  <TabPanel>
                    <ArticleForm onClose={onClose} />
                  </TabPanel>
                  <TabPanel>
                    <ContactForm onClose={onClose} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </DrawerBody>

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
