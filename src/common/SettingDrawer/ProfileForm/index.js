import * as React from "react";
import { memo } from "react";
import { useRecoilState } from "recoil";

import { Button } from "components";
import * as S from "data/template";
import { Input, Textarea, Form } from "common/FormFields";

import { SkillFields } from "./SkillFields";
import { SocialFields } from "./SocialFields";

export const ProfileForm = memo(({ onClose }) => {
  const [profile, setProfile] = useRecoilState(S.profile);

  const onSubmit = (data) => {
    setProfile(data);
    onClose();
  };

  return (
    <Form onSubmit={onSubmit} className="space-y-4" defaultValues={profile}>
      <Input variant="filled" name="avatarUrl" placeholder="Type your avatar..." label="Avatar Url" />
      <Input variant="filled" name="name" placeholder="Type your name..." label="Name" />
      <Input variant="filled" name="address" placeholder="Type your address..." label="Address" />
      <Input variant="filled" name="badge" placeholder="Type your badge..." label="Badge" />
      <Textarea variant="filled" name="bio" placeholder="Type your bio..." label="Bio" rows={6} />

      <SkillFields name="skills" />
      <SocialFields name="socials" />

      <Button className="mt-4" variantColor="gray" type="submit">
        Preview
      </Button>
    </Form>
  );
});
