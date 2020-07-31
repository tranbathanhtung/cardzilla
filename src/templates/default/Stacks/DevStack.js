import React from "react";

import { Link, IconButton, ButtonGroup, Button } from "components";
import { ChevronRight, ChevronLeft, Eye, MessageCircle, People, Heart } from "icons";
import { useStackDispatcher } from "../context/Stack";

const DevPost = () => (
  <div className="my-3">
    <div className="flex w-full mb-3 px-2 bg-gray-50 rounded-md shadow hover:shadow-lg cursor-pointer transition-shadow duration-200">
      <div className="flex p-3 w-full">
        <div className="flex w-full flex-col">
          <div className="flex w-full items-center justify-between relative">
            <Link className="text-xl font-normal text-gray-600">
              How I learn code on internet and get my first job?
            </Link>
            <ChevronRight />
          </div>
          <p className="!my-2">Published: Aug 19 '18</p>
          <div className="flex !my-2">
            <Link className="flex items-center">
              <Heart size={18} className="mr-2 text-pink-500" />
              <span>508</span>
            </Link>
            <span aria-hidden="true" className="mx-3">
              ·
            </span>
            <Link className="flex items-center">
              <MessageCircle size={18} className="mr-2 text-gray-600 text-opacity-80" />
              <span>508</span>
            </Link>
            <span aria-hidden="true" className="mx-3">
              ·
            </span>
            <Link className="flex items-center">
              <Eye size={18} className="mr-2 text-gray-600 text-opacity-80" />
              <span>26</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

function DevStack() {
  const dispatch = useStackDispatcher();

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
              <h3 className="!mt-2">Trần Bá Thanh Tùng</h3>
            </div>
            <div className="flex"></div>
          </div>
        </div>
      </div>

      <div className="px-8">
        <div className="flex justify-center my-3">
          <Link className="flex items-center">
            <People size={18} className="mr-2 text-gray-700 text-opacity-80" />
            <span>59 followers</span>
          </Link>
          <span aria-hidden="true" className="mx-4">
            ·
          </span>
          <Link className="flex items-center">
            <span>49 following</span>
          </Link>
          <span aria-hidden="true" className="mx-4">
            ·
          </span>
          <Link className="flex items-center">
            <Heart size={18} className="mr-2 text-gray-700 text-opacity-80" />
            <span>480</span>
          </Link>
        </div>

        <div className="my-3">
          <ButtonGroup className="flex flex-no-wrap">
            <Button variantColor="gray" className="w-full">
              Follow
            </Button>
          </ButtonGroup>
        </div>

        <h4 className="mb-3 uppercase">Posts</h4>
        <div className="my-3">
          <DevPost />
          <DevPost />
        </div>
      </div>
    </>
  );
}

export default DevStack;
