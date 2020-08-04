import * as React from "react";
import { memo } from "react";
import { useRecoilState } from "recoil";

import { Button } from "components";
import * as S from "selectors/schema";
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
      <Input variant="outline" name="avatarURL" placeholder="Type your avatar..." label="Avatar URL" />
      <Input variant="outline" name="name" placeholder="Type your name..." label="Name" />
      <Input variant="outline" name="address" placeholder="Type your address..." label="Address" />
      <Input variant="outline" name="badge" placeholder="Type your badge..." label="Badge" />
      <Textarea variant="outline" name="bio" placeholder="Type your bio..." label="Bio" rows={6} />

      <SkillFields name="skills" />
      <SocialFields name="socials" />

      <Button className="mt-4" variantColor="gray" type="submit" className="bg-gray-300 w-full">
        Preview
      </Button>
    </Form>
  );
});
