import * as React from "react";

import {
  Input as CharkaInput,
  InputGroup,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  InputRightAddon,
} from "components";

const Input = ({
  register,
  registerOptions = {},
  name,
  isDisabled,
  label,
  helperText = "",
  rightAddon = "",
  errors,
  errorMessage,
  ...rest
}) => {
  
  return (
    <FormControl isDisabled={isDisabled} isInvalid={!!errors[name]}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <InputGroup>
        <CharkaInput
          ref={register(registerOptions)}
          id={name}
          name={name}
          {...rest}
        />
        {rightAddon && (
          <InputRightAddon children={rightAddon} className="bg-gray-200" />
        )}
      </InputGroup>
      <FormHelperText>{helperText}</FormHelperText>
      {errors[name] && <FormErrorMessage>{errors[name]?.message || errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};

export default Input;
