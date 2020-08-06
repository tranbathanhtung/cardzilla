import React from "react";
import { memo } from "react";
import { useRecoilValue } from "recoil";
import { ChevronRight, ChevronLeft } from "react-feather";

import { Link, IconButton, ButtonGroup, Button } from "components";
import { Fork, Star, People, Heart } from "icons";
import * as S from "selectors/schema";

import { useStackDispatcher } from "../context/Stack";

const GithubRepo = memo(({ repo }) => (
  <Link
    className="focus:shadow-none !no-underline"
    href={repo.htmlUrl}
    target="_blank"
  >
    <div className="flex w-full mb-3 px-2 bg-gray-50 hover:bg-gray-100 dark:bg-whiteAlpha-200 dark:hover:bg-whiteAlpha-300 rounded-md shadow hover:shadow-lg cursor-pointer transition-all duration-200">
      <div className="flex p-3 w-full">
        <div className="flex w-full flex-col">
          <div className="flex w-full items-center justify-between relative">
            <h5 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              {repo.name}
            </h5>
            <div className="flex h-full mt-4">
              <ChevronRight size={24} />
            </div>
          </div>
          <p className="!my-2">{repo.description}</p>
          <div className="flex !my-2">
            {repo.language && (
              <>
                <div className="inline-flex items-center">
                  <span
                    className="w-3 h-3 rounded-full inline-block mr-2"
                    style={{ backgroundColor: repo.languageColor }}
                  ></span>
                  <span>{repo.language}</span>
                </div>
                <span aria-hidden="true" className="mx-3">
                  ·
                </span>
              </>
            )}

            <div className="flex items-center !no-underline">
              <Star
                size={18}
                className="mr-2 text-gray-600 text-opacity-80 dark:text-gray-300"
              />
              <span>{repo.star}</span>
            </div>
            <span aria-hidden="true" className="mx-3">
              ·
            </span>
            <div className="flex items-center !no-underline">
              <Fork
                size={18}
                className="mr-2 text-gray-600 text-opacity-80 dark:text-gray-300"
              />
              <span>{repo.fork}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
));

const GithubStack = memo(() => {
  const dispatch = useStackDispatcher();
  const github = useRecoilValue(S.github);
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
        <div className="flex justify-center my-3">
          <Link
            className="flex items-center"
            href={`${github.htmlUrl}?tab=followers`}
            target="_blank"
          >
            <People
              size={18}
              className="mr-2 text-gray-700 text-opacity-80 dark:text-gray-300"
            />
            <span>{github.followers} followers</span>
          </Link>
          <span aria-hidden="true" className="mx-4">
            ·
          </span>
          <Link
            className="flex items-center"
            href={`${github.htmlUrl}?tab=following`}
            target="_blank"
          >
            <span>{github.following} following</span>
          </Link>
          <span aria-hidden="true" className="mx-4">
            ·
          </span>
          <Link
            className="flex items-center"
            href={`${github.htmlUrl}?tab=stars`}
            target="_blank"
          >
            <Star
              size={18}
              className="mr-2 text-gray-700 text-opacity-80 dark:text-gray-300"
            />
            <span>{github.starredRepositories}</span>
          </Link>
        </div>

        <div className="my-3">
          <ButtonGroup className="flex flex-no-wrap">
            <Link
              href={github.htmlUrl}
              target="_blank"
              className="w-1/2 !no-underline"
            >
              <Button variantColor="gray" className="w-full">
                Follow
              </Button>
            </Link>
            <Link
              href={`https://github.com/sponsors/${github.username}`}
              target="_blank"
              className="w-1/2 !no-underline"
            >
              <Button
                variantColor="pink"
                leftIcon={<Heart size={18} className="mr-2" />}
                className="w-full"
              >
                Sponsor
              </Button>
            </Link>
          </ButtonGroup>
        </div>

        <h4 className="mb-3 uppercase">Overview</h4>
        <div className="mt-3 my-6">
          {github.repos?.map((repo, idx) => (
            <GithubRepo repo={repo} key={idx} />
          ))}
        </div>
      </div>
    </>
  );
});

export default GithubStack;
