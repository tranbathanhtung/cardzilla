import * as React from "react";
import classNames from "classnames";

import useAvatarClass from "./styles";
import { useHasImageLoaded } from "../Image";

export const AvatarBadge = ({ className, ...props }) => {
  return (
    <div
      className={classNames(
        "absolute flex items-center justify-center transform translate-x-1/2 translate-y-1/2 bottom-0 right-0 border-2 border-solid border-white dark:border-gray-800 rounded-full",
        className
      )}
      {...props}
    />
  );
};

const getInitials = (name) => {
  let [firstName, lastName] = name.split(" ");

  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  } else {
    return firstName.charAt(0);
  }
};

const AvatarName = ({ name, className, size, ...props }) => {
  return (
    <div
      className={classNames(
        "text-center uppercase font-medium",
        className,
      )}
      style={{
        width: size,
        height: size,
      }}
      aria-label={name}
      {...props}
    >
      {name ? getInitials(name) : null}
    </div>
  );
};

const DefaultAvatar = ({ className, ...props }) => (
  <div className={classNames("w-full h-full", className)} {...props}>
    <svg fill="#fff" viewBox="0 0 128 128" role="img">
      <g>
        <path d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z" />
        <path d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24" />
      </g>
    </svg>
  </div>
);

export const sizes = {
  "2xs": 4,
  xs: 6,
  sm: 8,
  base: 10,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  full: "full",
};

export const baseSizes = {
  "4": "1rem",
  "6": "1.5rem",
  "8": "2rem",
  "10": "2.5rem",
  "12": "3rem",
  "16": "4rem",
  "24": "6rem",
  xl: "36rem",
  "2xl": "42rem",
  full: "100%",
};

const Avatar = ({
  size,
  showBorder,
  name,
  src,
  borderColor,
  children,
  className,
  style,
  ...rest
}) => {
  const avatarClass = useAvatarClass({
    size,
    showBorder,
  });
  const hasLoaded = useHasImageLoaded({ src });

  const sizeKey = sizes[size];
  const _size = baseSizes[sizeKey];
  const fontSize = `calc(${_size} / 2.5)`;
  
  const renderChildren = () => {
    if (src && hasLoaded) {
      return (
        <img
          className="w-full h-full rounded-full object-cover"
          src={src}
          alt={name}
        />
      );
    }

    if (src && !hasLoaded) {
      if (name) {
        return <AvatarName size={_size} name={name} />;
      } else {
        return <DefaultAvatar aria-label={name} />;
      }
    }

    if (!src && name) {
      return <AvatarName size={_size} name={name} />;
    }

    return <DefaultAvatar aria-label={name} />;
  };

  return (
    <div
      className={classNames(
        "align-top",
        avatarClass,
        className,
      )}
      style={{
        fontSize,
        lineHeight: _size,
        ...style,
      }}
      {...rest}
    >
      {renderChildren()}
      {children}
    </div>
  );
};

Avatar.defaultProps = {
  size: "md",
};

export default Avatar;
