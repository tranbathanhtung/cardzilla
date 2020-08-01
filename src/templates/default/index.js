import * as React from "react";
import { Box } from "@chakra-ui/core";

import { StackController } from "./context/Stack";
import { ProfileStack, DetailStackContainer } from "./Stacks";
// import template from "./raw";

const DefaultTemplate = () => {
  return (
    <Box w="md" h="750px" bg="white" rounded="md" shadow="lg" position="relative" overflow="hidden">
      <StackController>
        <ProfileStack />
        <DetailStackContainer />
      </StackController>
    </Box>
  );
};

export default DefaultTemplate;
