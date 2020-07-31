import React from "react";
import { memo } from "react";
import { useRecoilValue } from "recoil";

import { Link, IconButton, ButtonGroup, Button } from "components";
import { ChevronRight, ChevronLeft, Fork, Star, People, Heart } from "icons";
import * as S from "data/template";

import { useStackDispatcher } from "../context/Stack";

const GithubRepo = memo(({ repo }) => (
  <div className="my-3">
    <div className="flex w-full mb-3 px-2 bg-gray-50 rounded-md shadow hover:shadow-lg cursor-pointer transition-shadow duration-200">
      <div className="flex p-3 w-full">
        <div className="flex w-full flex-col">
          <div className="flex w-full items-center justify-between relative">
            <Link className="text-xl font-normal text-gray-600">
              {repo.name}
            </Link>
            <ChevronRight />
          </div>
          <p className="!my-2">{repo.description}</p>
          <div className="flex !my-2">
            <span className="inline-flex items-center">
              <span
                className="w-3 h-3 rounded-full inline-block mr-2"
                style={{ backgroundColor: "#f1e05a" }}
              ></span>
              <span>{repo.language}</span>
            </span>
            <span aria-hidden="true" className="mx-3">
              ·
            </span>
            <Link className="flex items-center">
              <Star size={18} className="mr-2 text-gray-600 text-opacity-80" />
              <span>{repo.star}</span>
            </Link>
            <span aria-hidden="true" className="mx-3">
              ·
            </span>
            <Link className="flex items-center">
              <Fork size={18} className="mr-2 text-gray-600 text-opacity-80" />
              <span>{repo.fork}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
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

      <div className="px-8">
        <div className="flex justify-center my-3">
          <Link className="flex items-center">
            <People size={18} className="mr-2 text-gray-700 text-opacity-80" />
            <span>{github.followers} followers</span>
          </Link>
          <span aria-hidden="true" className="mx-4">
            ·
          </span>
          <Link className="flex items-center">
            <span>{github.following} following</span>
          </Link>
          <span aria-hidden="true" className="mx-4">
            ·
          </span>
          <Link className="flex items-center">
            <Star size={18} className="mr-2 text-gray-700 text-opacity-80" />
            <span>{github.starredRepositories}</span>
          </Link>
        </div>

        <div className="my-3">
          <ButtonGroup className="flex flex-no-wrap">
            <Button variantColor="gray" className="w-1/2">
              Follow
            </Button>
            <Button
              variantColor="pink"
              leftIcon={<Heart size={18} className="mr-2" />}
              className="w-1/2"
            >
              Sponsor
            </Button>
          </ButtonGroup>
        </div>

        <h4 className="mb-3 uppercase">Overview</h4>
        <div className="my-3">
          {github.repos?.map((repo, idx) => (
            <GithubRepo repo={repo} key={idx} />
          ))}
        </div>
      </div>
    </>
  );
});

export default GithubStack;
