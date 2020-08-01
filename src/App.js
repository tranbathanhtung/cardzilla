import React, { useMemo } from "react";
import { Flex, Stack } from "@chakra-ui/core";

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
    <Flex bg="gray.50" position="relative" w="100vw" h="100vh" align="center" justify="center">
      <Stack position="absolute" top="2rem" right="2rem" spacing={4} isInline className="space-x-4">
        <Download />
        <SettingDrawer />
      </Stack>
      {TemplateChild}
    </Flex>
  );
}

export default App;
