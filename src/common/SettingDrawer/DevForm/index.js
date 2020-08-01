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
import * as S from "data/template";
import { fetchDevArticles } from "api/dev";

import { ArticleFields } from "./ArticleFields";

const normalizeUser = (user) => {
  return {
    username: user.username,
    htmlUrl: `https://dev.to/${user.username}`,
    articles: user.articles?.map((article) => ({
      title: article.title,
      description: article.description,
      htmlUrl: article.url,
      comment: article.comments_count,
      reaction: article.positive_reactions_count,
    })),
  };
};

export const DevForm = memo(({ onClose }) => {
  const [dev, setDev] = useRecoilState(S.dev);
  const { register, handleSubmit, control, getValues, reset } = useForm({
    defaultValues: dev,
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setDev(data);
    onClose();
  };

  const handleLoadDevUsername = useCallback(async () => {
    try {
      setLoading(true);
      const username = getValues("username");
      const articles = await fetchDevArticles(username);
      setLoading(false);
      const devConfig = normalizeUser({
        username,
        articles,
      });
      console.log({ devConfig });
      reset(devConfig);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }, [getValues, reset]);

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
            placeholder="Enter your dev username"
            className="pr-16"
          />
          <InputRightElement className="w-16 !px-0">
            <Button
              variantColor="teal"
              size="sm"
              onClick={handleLoadDevUsername}
              isLoading={loading}
              isDisabled={loading}
            >
              Load
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Input
        type="hidden"
        variant="filled"
        ref={register()}
        id="htmlUrl"
        name="htmlUrl"
        placeholder=""
      />

      <ArticleFields control={control} register={register} />

      <Button className="mt-4" variantColor="gray" type="submit">
        Preview
      </Button>
    </form>
  );
});
