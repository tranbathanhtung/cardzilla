import * as React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import { Button } from "components";
import { Input, Textarea, Form } from "common/FormFields";
import {
  createOrUpdateSchema,
  createVercelUser,
  deleteVercelUser,
} from "services/firestore";
import { browser } from "services/browser";
import rawTemplate from "templates/default/default-template";
import rawApp from "fixtures/create-react-app";
import saveJsZip from "services/saveJsZip";
import * as S from "selectors";

function getDefaultHeaders(token) {
  if (!token) {
    throw new Error("You have no Vercel token");
  }

  return {
    Authorization: `bearer ${token}`,
  };
}

export const Deploy = () => {
  const schema = useRecoilValue(S.schemaState);
  const [user, setUser] = useRecoilState(S.user);

  const onSubmit = async () => {
    // console.log({ schema, user })
    // const raw = [...rawApp, ...rawTemplate];
    // const { file } = await saveJsZip.create(raw);
    // const content = await JSZip.loadAsync(file);
    // console.log({ file, content });
    // saveAs(file, "cardzilla-template.zip");
    // await createOrUpdateSchema(schema, user);
  };

  async function handleVercelLogin() {
    try {
      if (user.vercel && user.vercel.id) {
        // some how ?
        await deleteVercelUser(user);
      }

      const popup = browser.openPopup(
        `https://vercel.com/oauth/authorize?client_id=${process.env.REACT_APP_VERCEL_CLIENT_ID_DEV}`,
        "sign in"
      );
      const data = await browser.waitForMessage("vercel.sign.in");
      popup.close();
      if (data && data.code) {
        const newVercel = await createVercelUser(user, data.code);
        setUser({
          ...user,
          vercel: newVercel,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function handleVercelLogout() {
    await deleteVercelUser(user);
    setUser({
      ...user,
      vercel: null,
    });
  }

  return (
    <div className="w-full h-full">
      <div className="h-16 px-4 py-3 flex items-center justify-between border-b border-l border-solid border-gray-200 dark:border-gray-700">
        <p className="text-xl text-gray-700 dark:text-gray-200 font-semibold">
          Deploy
        </p>
        {!user.vercel ? (
          <Button
            variantColor="gray"
            className="bg-gray-300"
            onClick={handleVercelLogin}
          >
            Vercel
          </Button>
        ) : (
          <Button
            variantColor="gray"
            className="bg-gray-300"
            onClick={handleVercelLogout}
          >
            Logout
          </Button>
        )}
      </div>
      <div className="my-6 px-4 py-3">
        <Form
          onSubmit={onSubmit}
          className="space-y-4"
          defaultValues={{ title: schema?.profile?.name }}
        >
          <Input
            variant="outline"
            name="title"
            placeholder="Type your title..."
            label="Title"
          />
          <Input
            variant="outline"
            name="name"
            placeholder="Type your name..."
            label="Name"
            rightAddon=".vercel.com"
          />

          <Button
            className="mt-4"
            variantColor="gray"
            type="submit"
            className="bg-gray-300 w-full"
          >
            Publish
          </Button>
        </Form>
      </div>
    </div>
  );
};
