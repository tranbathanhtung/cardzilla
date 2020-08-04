import * as React from "react";
import { memo } from "react";
import { useRecoilState } from "recoil";

import { Button } from "components";
import * as S from "selectors/schema";
import { Input, Form } from "common/FormFields";

export const ContactForm = memo(({ onClose }) => {
  const [contact, setContact] = useRecoilState(S.contact);

  const onSubmit = (data) => {
    setContact(data);
    onClose();
  };

  return (
    <Form onSubmit={onSubmit} className="space-y-4" defaultValues={contact}>
      <Input variant="outline" name="email" placeholder="Type your email..." label="Email" />
      <Input variant="outline" name="phone" placeholder="Type your phone..." label="Phone" />
      <Input variant="outline" name="address" placeholder="Type your address..." label="Address" />

      <Button className="mt-4" variantColor="gray" type="submit" className="bg-gray-300">
        Preview
      </Button>
    </Form>
  );
});
