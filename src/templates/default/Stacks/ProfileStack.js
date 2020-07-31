import * as React from "react";
import { memo, useCallback } from "react";
import { useRecoilValue } from "recoil";

import {
  Avatar,
  IconButton,
  ButtonGroup,
  Button,
  Badge,
  Tag,
  TagLabel,
  Link,
} from "components";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  MapPin,
  Devto,
  Github,
  ChevronRight,
  Mail,
} from "icons";
import * as S from "data/template";

import { useStackDispatcher } from "../context/Stack";

const color = "pink";

const getDataFromSocial = (social) => {
  switch (social.type) {
    case "facebook":
      return {
        icon: Facebook,
        color: "blue",
      };
    case "instagram":
      return {
        icon: Instagram,
        color: "red",
      };
    case "twitter":
      return {
        icon: Twitter,
        color: "cyan",
      };
    case "linkedin":
      return {
        icon: Linkedin,
        color: "blue",
      };
    default:
      return {};
  }
};

const ProfileStack = memo(() => {
  const dispatch = useStackDispatcher();
  const profile = useRecoilValue(S.profile);
  
  const handleSetStack = useCallback(
    (type) => {
      dispatch({ type: "set.stack", payload: { stack: "detail", type } });
    },
    [dispatch]
  );

  return (
    <div className="flex flex-col overflow-hidden w-full h-full absolute top-0 bottom-0">
      <div className="relative overflow-y-auto overflow-x-hidden flex flex-col z-1 h-full">
        <div className="relative flex w-full flex-shrink-0 h-64">
          <Badge
            className="absolute top-4 left-4"
            variant="subtle"
            variantColor={color}
          >
            {profile.badge}
          </Badge>
          <Avatar
            size="2xl"
            name="Trần Bá Thanh Tùng"
            src="https://images.unsplash.com/photo-1568035105640-89538ccccd24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
            className={`object-cover object-center absolute left-1/2 bottom-0 transform -translate-y-16 -translate-x-1/2 border-8 border-solid border-gray-300`}
          />
          <h3 className="absolute bottom-0 left-1/2 whitespace-no-wrap transform -translate-x-1/2 -translate-y-4 text-center">
            {profile.name}
          </h3>
          <div className="flex items-center absolute bottom-0 left-1/2 whitespace-no-wrap transform -translate-x-1/2 -translate-y-0">
            <MapPin size={18} className="mr-2" />
            <h5>{profile.address}</h5>
          </div>
        </div>

        <div className="relative flex flex-col px-8">
          <div className="my-2">
            <p className="text-center">
              he/him. Building{" "}
              <Link
                href="#"
                className={`font-semibold !text-${color}-500 hover:text-${color}-600`}
              >
                @tailzilla
              </Link>{" "}
              and{" "}
              <Link
                href="#"
                className={`font-semibold !text-${color}-500 hover:text-${color}-600`}
              >
                @cardzilla
              </Link>
              . Past: dev{" "}
              <Link
                href="#"
                className={`font-semibold !text-${color}-500 hover:text-${color}-600`}
              >
                @logivan
              </Link>
              ,{" "}
              <Link
                href="#"
                className={`font-semibold !text-${color}-500 hover:text-${color}-600`}
              >
                @solid.engineer
              </Link>
            </p>
          </div>

          <div className="my-2">
            <ButtonGroup spacing="6" className="flex justify-center">
              {profile.socials.map((social) => {
                const { color, icon: Icon } = getDataFromSocial(social);
                return (
                  <IconButton
                    key={social.type}
                    size="md"
                    onClick={() => {}}
                    variantColor={color}
                    variant="solid"
                    isRound
                    aria-label=""
                  >
                    <Icon size={18} />
                  </IconButton>
                );
              })}
            </ButtonGroup>
          </div>
        </div>

        <div className="flex flex-col px-8 py-2">
          <h6 className="uppercase">Skills</h6>
          <div className="flex flex-wrap list-none my-5">
            {profile.skills.map((skill, idx) => (
              <div className="mr-2 mb-2" key={idx}>
              <Tag variantColor={skill.color || "gray"}>
                <TagLabel>{skill.name}</TagLabel>
              </Tag>
            </div>
            ))}
          </div>
        </div>

        <div className="px-8 py-2">
          <div className="w-full">
            <Button
              size="md"
              variantColor="gray"
              className="w-full justify-between mb-3"
              onClick={() => handleSetStack("github")}
            >
              <div className="flex items-center">
                <Github size={24} className="mr-2" />
                <span>Github</span>
              </div>
              <ChevronRight size={24} />
            </Button>

            <Button
              variantColor="gray"
              className="w-full justify-between mb-3"
              onClick={() => handleSetStack("dev")}
            >
              <div className="flex items-center">
                <Devto size={24} className="mr-2 text-gray-700" />
                <span>Dev</span>
              </div>
              <ChevronRight size={24} />
            </Button>

            <Button
              variantColor="gray"
              className="w-full justify-between mb-3s"
              onClick={() => handleSetStack("contact")}
            >
              <div className="flex items-center">
                <Mail size={24} className="mr-2" />
                <span>Contact</span>
              </div>
              <ChevronRight size={24} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProfileStack;
