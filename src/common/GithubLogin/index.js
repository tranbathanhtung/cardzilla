import * as React from "react";
import { memo } from "react";
import { GitHub } from "react-feather";

import { Button } from "components";

export const GithubLogin = memo(({ className }) => {
  
  return (
    <Button
      size="md"
      variantColor="gray"
      variant="solid"
      className={className}
      leftIcon={<GitHub size={18} className="mr-2" />}
    >
      Sign In
    </Button>
  );
});
