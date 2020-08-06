import * as React from "react";
import { memo } from "react";
import { useRecoilState } from "recoil";

import * as S from "selectors/schema";
import { Input, Textarea, Form } from "common/FormFields";

import { SkillFields } from "./SkillFields";
import { SocialFields } from "./SocialFields";

export const ProfileForm = memo(() => {
  const [profile, setProfile] = useRecoilState(S.profile);

  const onChange = (data) => {
    setProfile(data);
  };

  return (
    <Form onChange={onChange} className="space-y-4" defaultValues={profile}>
      <Input
        variant="outline"
        name="avatarURL"
        placeholder="Type your avatar..."
        label="Avatar URL"
      />
      <Input
        variant="outline"
        name="name"
        placeholder="Type your name..."
        label="Name"
        registerOptions={{
          maxLength: 50,
          required: "name is required",
        }}
        errorMessage="name can't be more than 50 characters"
      />
      <Input
        variant="outline"
        name="address"
        placeholder="Type your address..."
        label="Address"
        registerOptions={{
          maxLength: 30,
        }}
        errorMessage="address can't be more than 30 characters"
      />
      <Input
        variant="outline"
        name="badge"
        placeholder="Type your badge..."
        label="Badge"
        registerOptions={{
          maxLength: 20,
        }}
        errorMessage="badge can't be more than 20 characters"
      />
      <Textarea
        variant="outline"
        name="bio"
        placeholder="Type your bio..."
        label="Bio"
        rows={6}
        registerOptions={{
          maxLength: 300,
        }}
        errorMessage="bio can't be more than 300 characters"
      />

      <SkillFields name="skills" />
      <SocialFields name="socials" />
    </Form>
  );
});
