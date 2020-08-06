import * as React from "react";
import { memo } from "react";
import { useRecoilState } from "recoil";

import * as S from "selectors/schema";
import { Input, Form } from "common/FormFields";

export const ContactForm = memo(() => {
  const [contact, setContact] = useRecoilState(S.contact);

  const onSubmit = (data) => {
    setContact(data);
  };

  return (
    <Form onSubmit={onSubmit} className="space-y-4" defaultValues={contact}>
      <Input variant="outline" name="email" placeholder="Type your email..." label="Email" />
      <Input variant="outline" name="phone" placeholder="Type your phone..." label="Phone" />
      <Input variant="outline" name="address" placeholder="Type your address..." label="Address" />
    </Form>
  );
});
