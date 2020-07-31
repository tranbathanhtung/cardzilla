import * as React from "react";

import {
  Textarea as CharkaTextarea,
  FormControl,
  FormLabel,
} from "components";

const Textarea = ({ register, name, isDisabled, label, ...rest }) => {
  return (
    <FormControl isDisabled={isDisabled}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <CharkaTextarea
        ref={register()}
        id={name}
        name={name}
        {...rest}
      />
    </FormControl>
  );
};

export default Textarea;