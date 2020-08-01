import React from "react";
import { memo } from "react";
import { useRecoilValue } from "recoil";

import { Link, IconButton, ButtonGroup, Button } from "components";
import { ChevronRight, ChevronLeft, MessageCircle, Heart } from "icons";
import * as S from "data/template";

import { useStackDispatcher } from "../context/Stack";

const DevArticle = memo(({ article }) => (
  <Link
    className="focus:shadow-none !no-underline"
    href={article.htmlUrl}
    target="_blank"
  >
    <div className="flex w-full mb-3 px-2 bg-gray-50 rounded-md shadow hover:shadow-lg cursor-pointer transition-shadow duration-200">
      <div className="flex p-3 w-full">
        <div className="flex w-full flex-col">
          <div className="flex w-full items-center justify-between relative">
            <Link className="text-xl font-normal text-gray-600">
              {article.title}
            </Link>
            <ChevronRight />
          </div>
          <p className="!my-2">{article.description}</p>
          <div className="flex !my-2">
            <Link className="flex items-center !no-underline">
              <Heart size={18} className="mr-2 text-pink-500" />
              <span>{article.reaction}</span>
            </Link>
            <span aria-hidden="true" className="mx-3">
              ·
            </span>
            <Link className="flex items-center !no-underline">
              <MessageCircle
                size={18}
                className="mr-2 text-gray-600 text-opacity-80"
              />
              <span>{article.comment}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </Link>
));

const DevStack = memo(() => {
  const dispatch = useStackDispatcher();
  const dev = useRecoilValue(S.dev);
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

      <div className="px-8 overflow-y-auto hide-scrollbar">
        <div className="my-3">
          <Link
            href={dev.htmlUrl}
            target="_blank"
            className="w-full !no-underline"
          >
            <Button variantColor="gray" className="w-full">
              Follow
            </Button>
          </Link>
        </div>

        <h4 className="mb-3 uppercase">Articles</h4>
        <div className="my-3">
          {dev.articles?.map((article, idx) => (
            <DevArticle key={idx} article={article} />
          ))}
        </div>
      </div>
    </>
  );
});

export default DevStack;
