import * as React from "react";
import { memo, useCallback, useState } from "react";
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
import * as S from "selectors";
import { fetchGithubUser } from "services/api/github";

import { RepoFields } from "./RepoFields";

const normalizeUser = (user) => {
  return {
    username: user.username,
    htmlUrl: user.url,
    followers: user.followers?.totalCount,
    following: user.following?.totalCount,
    starredRepositories: user.starredRepositories?.totalCount,
    sponsorUrl: `https://github.com/sponsor/${user.username}`,
    repos: user.pinnedItems?.nodes?.map((item) => ({
      name: item.name,
      htmlUrl: item.url,
      description: item.description,
      language: item.primaryLanguage?.name,
      languageColor: item.primaryLanguage?.color,
      star: item.stargazers?.totalCount,
      fork: item.forkCount,
    })),
  };
};

export const GithubForm = memo(() => {
  const [github, setGithub] = useRecoilState(S.github);
  const { register, handleSubmit, control, getValues, reset } = useForm({
    defaultValues: github,
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setGithub(data);
  };

  const handleLoadGithubUsername = useCallback(async () => {
    try {
      setLoading(true);
      const username = getValues("username");
      const user = await fetchGithubUser(username);
      setLoading(false);
      const githubConfig = normalizeUser({ username, ...user });
      reset(githubConfig);
      setGithub(githubConfig);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValues, reset]);

  return (
    <form onChange={handleSubmit(onSubmit)} className="space-y-4">
      <FormControl>
        <FormLabel htmlFor="username">Username</FormLabel>
        <InputGroup size="md" className="mt-4">
          <Input
            variant="outline"
            ref={register()}
            id="username"
            name="username"
            placeholder="Enter your github username"
            className="pr-16"
          />
          <InputRightElement className="w-16 !px-0">
            <Button
              variantColor="gray"
              size="sm"
              onClick={handleLoadGithubUsername}
              isLoading={loading}
              isDisabled={loading}
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
            variant="outline"
            ref={register()}
            id="followers"
            name="followers"
            placeholder=""
          />
        </FormControl>
        <FormControl isDisabled className="w-1/3">
          <FormLabel htmlFor="following">Following</FormLabel>
          <Input
            variant="outline"
            ref={register()}
            id="following"
            name="following"
            placeholder=""
          />
        </FormControl>
        <FormControl isDisabled className="w-1/3">
          <FormLabel htmlFor="starredRepositories">Starred</FormLabel>
          <Input
            variant="outline"
            ref={register()}
            id="starredRepositories"
            name="starredRepositories"
            placeholder=""
          />
        </FormControl>
      </div>

      <Input
        type="hidden"
        variant="outline"
        ref={register()}
        id="htmlUrl"
        name="htmlUrl"
        placeholder=""
      />

      <Input
        type="hidden"
        variant="outline"
        ref={register()}
        id="sponsorUrl"
        name="sponsorUrl"
        placeholder=""
      />

      <RepoFields control={control} register={register} />
    </form>
  );
});
