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
  FormHelperText,
} from "components";
import * as S from "selectors";
import { fetchDevArticles } from "services/api/dev";

import { ArticleFields } from "./ArticleFields";

const normalizeArticles = (user) => {
  return user.articles?.map((article) => ({
    title: article.title,
    description: article.description,
    htmlUrl: article.url,
    comment: article.comments_count,
    reaction: article.positive_reactions_count,
  }));
};

export const ArticleForm = memo(() => {
  const [articles] = useRecoilState(S.articles);
  const { register, control, getValues, reset } = useForm({
    defaultValues: { articles },
  });

  const [loading, setLoading] = useState(false);

  const handleLoadDevUsername = useCallback(async () => {
    try {
      setLoading(true);
      const username = getValues("username");
      const newArticles = await fetchDevArticles(username);
      setLoading(false);
      const articlesConfig = normalizeArticles({
        username,
        articles: newArticles,
      });
      reset({ articles: [...articles, ...articlesConfig] });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }, [getValues, reset, articles]);

  return (
    <form className="space-y-4">
      <FormControl>
        <FormLabel htmlFor="username">Username</FormLabel>
        <InputGroup size="md" className="mt-4">
          <Input
            variant="outline"
            ref={register()}
            id="username"
            name="username"
            placeholder="Enter your dev username"
            className="pr-16"
          />
          <InputRightElement className="w-16 !px-0">
            <Button
              variantColor="gray"
              size="sm"
              onClick={handleLoadDevUsername}
              isLoading={loading}
              isDisabled={loading}
            >
              Load
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormHelperText>
          * You can load your articles from dev.to or add manually.
        </FormHelperText>
      </FormControl>

      <ArticleFields control={control} register={register} />
    </form>
  );
});
