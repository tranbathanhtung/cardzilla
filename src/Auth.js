import { memo } from "react";
import { useSetRecoilState } from "recoil";

import { auth } from "services/firebase";
import { getSchemaByUserId, getVercelUserByUserId } from "services/firestore";
import * as S from "selectors";
import defaultSchema from "fixtures/defaultSchema";
import { useMount } from "hooks/useMount";
import { normalizeUser, normalizeSchema } from "services/normalizeData";

export const Auth = memo(() => {
  const setUser = useSetRecoilState(S.user);
  const setSchema = useSetRecoilState(S.schemaState);
  const setWorkspace = useSetRecoilState(S.workspace);

  useMount(() => {
    auth().onAuthStateChanged(async function (user) {
      try {
        if (user) {
          const [vercel, userSchema] = await Promise.all([
            getVercelUserByUserId(user.uid),
            getSchemaByUserId(user.uid),
          ]);
          const currentUser = normalizeUser(user, vercel);
          setUser(currentUser);
          setWorkspace("");
          if (!userSchema) return;
          const latestSchema = normalizeSchema(userSchema, defaultSchema);
          setSchema(latestSchema);
        } else {
          setUser(null);
          setWorkspace("");
          const latestSchema = normalizeSchema(null, defaultSchema);
          setSchema(latestSchema);
        }
      } catch (e) {
        console.log(e);
      }
    });
  });

  useMount(() => {
    const matchArr = document.location.search.match(/\?code=(.*)/);
    if (matchArr) {
      // eslint-disable-next-line no-unused-vars
      const [_, code] = document.location.search.match(/\?code=(.*)/);
      if (code) {
        if (window.opener) {
          if (window.opener.location.origin === window.location.origin) {
            window.opener.postMessage(
              {
                type: "vercel.sign.in",
                data: {
                  code,
                },
              },
              "*"
            );
          }
          return;
        }
        return;
      }
    }
  });

  return null;
});
