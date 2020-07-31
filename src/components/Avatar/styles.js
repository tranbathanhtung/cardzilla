import classNames from "classnames";

// Found this on StackOverflow :)
// function string2Hex(str) {
//   let hash = 0;
//   if (str.length === 0) return hash;
//   for (let i = 0; i < str.length; i++) {
//     hash = str.charCodeAt(i) + ((hash << 5) - hash);
//     hash = hash & hash;
//   }
//   let color = "#";
//   for (let j = 0; j < 3; j++) {
//     let value = (hash >> (j * 8)) & 255;
//     color += ("00" + value.toString(16)).substr(-2);
//   }
//   return color;
// }

export const avatarSizes = {
  "2xs": "w-4 h-4",
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  base: "w-10 h-10",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
  "2xl": "w-32 h-32",
  full: "w-full h-full",
};

const useAvatarClass = ({ size, showBorder }) => {

  return classNames(
    "inline-flex rounded-full items-center flex-shrink-0 justify-center",
    avatarSizes[size],
    "bg-gray-400 text-gray-800",
    showBorder && "border-2 border-white border-gray-800",
  );
};

export default useAvatarClass;