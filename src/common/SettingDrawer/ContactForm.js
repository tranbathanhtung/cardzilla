import * as React from "react";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";

import {
  Input,
  FormControl,
  FormLabel,
  Button,
} from "components";
import * as S from "data/template";

export const ContactForm = memo(({ onClose }) => {
  const [contact, setContact] = useRecoilState(S.contact);
  const { register, handleSubmit, control } = useForm({
    defaultValues: contact,
  });

  const onSubmit = (data) => {
    setContact(data);
    onClose();
  };
  // const watchAllFields = watch(); // when pass nothing as argument, you are watching everything
  // setProfile(watchAllFields)
  // React.useEffect(() => {
  //   setProfile(watchAllFields)
  // }, [watchAllFields]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          variant="filled"
          ref={register()}
          id="email"
          name="email"
          placeholder="Type your email..."
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="phone">Phone</FormLabel>
        <Input
          variant="filled"
          ref={register()}
          id="phone"
          name="phone"
          placeholder="Type your phone..."
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="address">Address</FormLabel>
        <Input
          variant="filled"
          ref={register()}
          id="address"
          name="address"
          placeholder="Type your address..."
        />
      </FormControl>

      <Button className="mt-4" variantColor="gray" type="submit">
        Preview
      </Button>
    </form>
  );
});
