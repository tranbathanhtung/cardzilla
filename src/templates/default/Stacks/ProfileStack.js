import * as React from "react";
import { memo, useCallback } from "react";
import { useRecoilValue } from "recoil";
import unified from "unified";
import parse from "remark-parse";
import remark2react from "remark-react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  MapPin,
  ChevronRight,
  Mail,
  GitHub,
  Codepen,
  Codesandbox,
  Youtube,
  Twitch,
} from "react-feather";

import {
  Avatar,
  IconButton,
  Button,
  Badge,
  Tag,
  TagLabel,
  Link,
} from "components";
import { News } from "icons";
import * as S from "selectors/schema";

import { useStackDispatcher } from "../context/Stack";

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
    case "codepen":
      return {
        icon: Codepen,
        color: "gray",
      };
    case "codesandbox":
      return {
        icon: Codesandbox,
        color: "gray",
      };
    case "youtube":
      return {
        icon: Youtube,
        color: "red",
      };
    case "twitch":
      return {
        icon: Twitch,
        color: "purple",
      };
    case "github":
      return {
        icon: GitHub,
        color: "gray",
      };
    default:
      return {};
  }
};

const BioLink = (props) => {
  const color = useRecoilValue(S.color);

  return (
    <Link
      className={`font-semibold !text-${color}-500`}
      target="_blank"
      {...props}
    />
  );
};
const ProfileStack = memo(() => {
  const dispatch = useStackDispatcher();
  const profile = useRecoilValue(S.profile);
  const color = useRecoilValue(S.color);

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
            name={profile.name}
            src={profile.avatarURL}
            className={`object-cover object-center absolute left-1/2 bottom-0 transform -translate-y-20 -translate-x-1/2 border-8 border-solid border-gray-300`}
          />
          <h3 className="absolute bottom-0 left-1/2 whitespace-no-wrap transform -translate-x-1/2 -translate-y-6 text-center">
            {profile.name}
          </h3>

          {profile.address && (
            <div className="flex items-center absolute bottom-0 left-1/2 whitespace-no-wrap transform -translate-x-1/2 -translate-y-0">
              <MapPin size={18} className="mr-2" />
              <h5>{profile.address}</h5>
            </div>
          )}
        </div>

        <div className="relative flex flex-col px-8">
          <div className="my-2 text-center">
            {
              unified()
                .use(parse)
                .use(remark2react, {
                  remarkReactComponents: {
                    a: BioLink,
                  },
                })
                .processSync(profile.bio).result
            }
          </div>

          {profile.socials?.length ? (
            <div className="my-4">
              <div className="flex items-center justify-center space-x-4">
                {profile.socials.map((social, idx) => {
                  const { color, icon: Icon } = getDataFromSocial(social);
                  return (
                    <Link href={social.link} target="_blank" key={idx}>
                      <IconButton
                        size="md"
                        variantColor={color}
                        variant="solid"
                        isRound
                        aria-label=""
                      >
                        <Icon size={18} />
                      </IconButton>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        {profile.skills?.length ? (
          <div className="flex flex-col px-8 py-2">
            <h5 className="uppercase">skills</h5>
            <div className="flex flex-wrap list-none my-4">
              {profile.skills.map((skill, idx) => (
                <div className="mr-2 mb-2" key={idx}>
                  <Tag variantColor={skill.color || "gray"}>
                    <TagLabel>{skill.name}</TagLabel>
                  </Tag>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="flex flex-1 px-8 pt-2 pb-6">
          <div className="flex flex-col justify-start w-full">
            <Button
              size="md"
              variantColor="gray"
              className="w-full justify-between mb-3"
              onClick={() => handleSetStack("github")}
            >
              <div className="flex items-center">
                <GitHub size={24} className="mr-2" />
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
                <News size={24} className="mr-2" />
                <span>Articles</span>
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
