import * as React from "react";
import { memo, useEffect } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";

import { auth } from "services/firebase";
import { getSchemaByUserId, getVercelUserByUserId } from "services/firestore";
import * as S from "selectors/user";
import { schemaState } from "selectors/schema";
import defaultSchema from "fixtures/defaultSchema";

const normalizeUser = (user, vercel) => ({
  id: user.uid,
  displayName: user.displayName,
  photoURL: user.photoURL,
  vercel: vercel,
});

const normalizeSchema = (schema) => ({
  ...schema,
  config:
    typeof schema.config === "string"
      ? JSON.parse(schema.config)
      : schema.config,
});

export const Auth = memo(() => {
  const setUser = useSetRecoilState(S.user);
  const [schema, setSchema] = useRecoilState(schemaState);
  useEffect(() => {
    auth().onAuthStateChanged(async function (user) {
      try {
        if (user) {
          const [vercel, userSchema] = await Promise.all([
            getVercelUserByUserId(user.uid),
            getSchemaByUserId(user.uid),
          ]);
          const currentUser = normalizeUser(user, vercel);
          setUser(currentUser);
          console.log({ currentUser, userSchema });

          if (userSchema) {
            setSchema(normalizeSchema(userSchema));
            return;
          } else if (schema) {
            // keep user's work
            setSchema(normalizeSchema(schema));
            return;
          } else {
            setSchema(normalizeSchema(defaultSchema));
          }
        } else {
          setUser(null);
          if (schema) {
            setSchema(normalizeSchema(schema));
            return;
          } else {
            setSchema(normalizeSchema(defaultSchema));
          }
        }

      } catch (e) {
        console.log(e);
      }
    });
  }, []);

  useEffect(() => {
    const matchArr = document.location.search.match(/\?code=(.*)/);
    // eslint-disable-next-line no-unused-vars
    if (matchArr) {
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
  }, []);

  return null;
});
