import * as React from "react";

import {
  Input,
  FormControl,
  FormLabel,
} from "components";

const Input = ({ register, name, isDisabled, label, ...rest }) => {
  return (
    <FormControl isDisabled={isDisabled}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        ref={register()}
        id={name}
        name={name}
      />
    </FormControl>
  );
};

export default Input;