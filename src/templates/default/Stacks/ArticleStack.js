import React from "react";
import { memo } from "react";
import { useRecoilValue } from "recoil";
import { ChevronRight, ChevronLeft, MessageCircle, Heart } from "react-feather";

import { Link, IconButton } from "components";
import * as S from "selectors/schema";

import { useStackDispatcher } from "../context/Stack";

const Article = memo(({ article }) => (
  <Link
    className="focus:shadow-none !no-underline"
    href={article.htmlUrl}
    target="_blank"
  >
    <div className="flex w-full mb-3 px-2 bg-gray-50 hover:bg-gray-100 dark:bg-whiteAlpha-200 dark:hover:bg-whiteAlpha-300 rounded-md shadow hover:shadow-lg cursor-pointer transition-all duration-200">
      <div className="flex p-3 w-full">
        <div className="flex w-full flex-col">
          <div className="flex w-full items-center justify-between relative">
            <h5 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              {article.title}
            </h5>
            <div className="flex h-full mt-4">
              <ChevronRight size={24} />
            </div>
          </div>
          <p className="!my-2">{article.description}</p>
          <div className="flex !my-2">
            <div className="flex items-center !no-underline">
              <Heart
                size={18}
                className="mr-2 text-pink-600 dark:text-pink-300"
              />
              <span>{article.reaction}</span>
            </div>
            <span aria-hidden="true" className="mx-3">
              ·
            </span>
            <div className="flex items-center !no-underline">
              <MessageCircle
                size={18}
                className="mr-2 text-gray-600 text-opacity-80 dark:text-gray-300"
              />
              <span>{article.comment}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
));

const ArticleStack = memo(() => {
  const dispatch = useStackDispatcher();
  const articles = useRecoilValue(S.articles);
  const profile = useRecoilValue(S.profile);

  return (
    <>
      <div>
        <div className="px-6 pt-4 h-full flex items-center">
          <div className="flex items-center">
            <IconButton
              size="md"
              onClick={() => dispatch({ type: "reset.stack" })}
              variantColor="gray"
              variant="ghost"
              isRound
              aria-label="Previous Stack"
            >
              <ChevronLeft size={24} />
            </IconButton>
            <div className="flex-1 flex items-center mx-2">
              <h3 className="!mt-2">{profile.name}</h3>
            </div>
            <div className="flex"></div>
          </div>
        </div>
      </div>

      <div className="px-8 overflow-y-auto">
        <h4 className="mb-3 uppercase">Articles</h4>
        <div className="my-3">
          {articles?.map((article, idx) => (
            <Article key={idx} article={article} />
          ))}
        </div>
      </div>
    </>
  );
});

export default ArticleStack;
