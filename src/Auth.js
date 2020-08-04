import * as React from "react";
import { memo, useEffect } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";

import { auth } from "services/firebase";
import { getSchemaByUserId, getVercelUserByUserId } from "services/firestore";
import * as S from "data/user";
import { schemaState } from "data/schema";
import defaultSchema from "data/defaultSchema";

const normalizeUser = (user, vercel) => ({
  id: user.uid,
  displayName: user.displayName,
  photoURL: user.photoURL,
  vercel: vercel,
});

const normalizeSchema = schema => ({
  ...schema,
  config: typeof schema.config === "string" ? JSON.parse(schema.config) : schema.config,
})

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
      } catch(e) {
        console.log(e)
      }
    });
  }, []);

  return null;
});
