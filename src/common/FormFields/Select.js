import * as React from "react";

import { Select as CharkaSelect, FormControl, FormLabel } from "components";

const Select = ({ register, name, isDisabled, label, ...rest }) => {
  return (
    <FormControl isDisabled={isDisabled}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <CharkaSelect
        ref={register()}
        id={name}
        name={name}
        rootProps={{}}
        {...rest}
      />
    </FormControl>
  );
};

export default Select;
