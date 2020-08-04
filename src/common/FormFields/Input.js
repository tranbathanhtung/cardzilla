import * as React from "react";

import {
  Input as CharkaInput,
  InputGroup,
  FormControl,
  FormLabel,
  InputRightAddon,
} from "components";

const Input = ({ register, name, isDisabled, label, rightAddon = "", ...rest }) => {
  return (
    <FormControl isDisabled={isDisabled}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <InputGroup>
        <CharkaInput ref={register()} id={name} name={name} {...rest} />
        {rightAddon && (
          <InputRightAddon children={rightAddon} className="bg-gray-200" />
        )}
      </InputGroup>
    </FormControl>
  );
};

export default Input;
