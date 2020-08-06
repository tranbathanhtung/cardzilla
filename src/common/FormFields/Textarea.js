import * as React from "react";

import {
  Textarea as CharkaTextarea,
  InputGroup,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  InputRightAddon,
} from "components";

const Textarea = ({
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
        <CharkaTextarea
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

export default Textarea;
