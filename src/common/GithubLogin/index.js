import * as React from "react";
import { memo } from "react";
import { GitHub } from "react-feather";
import { useRecoilValue } from "recoil";

import { Button, Avatar } from "components";
import { auth, provider } from "services/firebase";
import * as S from "selectors/user";

const getFirstName = (name) => {
  if (typeof name !== "string") return name;
  const listName = name.split(" ");
  return listName?.[0];
};

export const GithubLogin = memo(() => {
  const user = useRecoilValue(S.user);

  const handleAuth = () => {
    if (!auth().currentUser || !user) {
      auth().signInWithPopup(provider);
    } else {
      auth().signOut();
    }
  };
  return (
    <>
      {user ? (
        <Button
          size="md"
          variantColor="gray"
          variant="solid"
          className="bg-gray-300"
          onClick={handleAuth}
        >
          <Avatar
            size="sm"
            name={user.displayName}
            src={user.photoURL}
            style={{
              height: 28,
              width: 28,
            }}
          />
          <span className="text-sm font-semibold mr-2 ml-2 truncate">
            {getFirstName(user.displayName)}
          </span>
        </Button>
      ) : (
        <Button
          size="md"
          variantColor="gray"
          variant="solid"
          className="bg-gray-300"
          onClick={handleAuth}
          leftIcon={<GitHub size={18} className="mr-2" />}
        >
          Sign In
        </Button>
      )}
    </>
  );
});
