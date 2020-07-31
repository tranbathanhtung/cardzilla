import * as React from "react";

import {
  Input as CharkaInput,
  FormControl,
  FormLabel,
} from "components";

const Input = ({ register, name, isDisabled, label, ...rest }) => {
  return (
    <FormControl isDisabled={isDisabled}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <CharkaInput
        ref={register()}
        id={name}
        name={name}
        {...rest}
      />
    </FormControl>
  );
};

export default Input;