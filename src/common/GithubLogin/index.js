import * as React from "react";
import { memo } from "react";
import { GitHub } from "react-feather";
import { useRecoilValue } from "recoil";

import { Button } from "components";
import { auth, provider } from "services/firebase";
import { createUser } from "services/firestore";
import * as S from "selectors/user";

export const GithubLogin = memo(() => {
  const user = useRecoilValue(S.user);

  const handleAuth = () => {
    // console.log(auth())
    // auth().signOut();
    if (!auth().currentUser || !user) {
      auth()
        .signInWithPopup(provider)
        .then(function (result) {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          const token = result.credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // ...
        })
        .catch(function (error) {
          // Handle Errors here.
          console.log(error);
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          const credential = error.credential;
          // ...
        });
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
          Logout
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
