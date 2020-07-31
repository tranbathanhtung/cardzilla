import * as React from "react";
import { memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";

import {
  Input,
  FormControl,
  FormLabel,
  Button,
  InputGroup,
  InputRightElement,
} from "components";
import * as S from "data/template";
import { fetchGithubUser } from "api/github";

export const GithubForm = memo(({ onClose }) => {
  const [github, setGithub] = useRecoilState(S.github);
  const { register, handleSubmit, control, getValues } = useForm({
    defaultValues: github,
  });

  const onSubmit = (data) => {
    setGithub(data);
    onClose();
  };

  const handleLoadGithubUsername = useCallback(() => {
    const username = getValues("username");
    console.log({ username });
    fetchGithubUser(username);
  }, [getValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormControl>
        <FormLabel htmlFor="username">Username</FormLabel>
        <InputGroup size="md" className="mt-4">
          <Input
            variant="filled"
            ref={register()}
            id="username"
            name="username"
            placeholder="Enter your github username"
            className="pr-24"
          />
          <InputRightElement className="w-24">
            <Button
              variantColor="gray"
              size="sm"
              onClick={handleLoadGithubUsername}
            >
              Load
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <div className="flex flex-row flex-no-wrap space-x-4">
        <FormControl isDisabled className="w-1/3">
          <FormLabel htmlFor="followers">Followers</FormLabel>
          <Input
            variant="filled"
            ref={register()}
            id="followers"
            name="followers"
            placeholder=""
          />
        </FormControl>
        <FormControl isDisabled className="w-1/3">
          <FormLabel htmlFor="following">Following</FormLabel>
          <Input
            variant="filled"
            ref={register()}
            id="following"
            name="following"
            placeholder=""
          />
        </FormControl>
        <FormControl isDisabled className="w-1/3">
          <FormLabel htmlFor="starredRepositories">Starred</FormLabel>
          <Input
            variant="filled"
            ref={register()}
            id="starredRepositories"
            name="starredRepositories"
            placeholder=""
          />
        </FormControl>
      </div>

      <Input
        type="hidden"
        variant="filled"
        ref={register()}
        id="htmlUrl"
        name="htmlUrl"
        placeholder=""
      />

      <Button className="mt-4" variantColor="gray" type="submit">
        Preview
      </Button>
    </form>
  );
});
