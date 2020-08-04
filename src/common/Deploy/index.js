import * as React from "react";
import { useRecoilValue } from "recoil";

import { Button } from "components";
import { Input, Textarea, Form } from "common/FormFields";
import { createOrUpdateSchema } from "services/firestore";
import * as S from "data";

export const Deploy = () => {
  const schema = useRecoilValue(S.schemaState);
  const user = useRecoilValue(S.user);

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
   
  }

  return (
    <div className="w-full h-full">
      <div className="h-16 px-4 py-3 flex items-center justify-between border-b border-l border-solid border-gray-200 dark:border-gray-700">
        <p className="text-xl text-gray-700 dark:text-gray-200 font-semibold">
          Deploy
        </p>
        <Button
          variantColor="gray"
          className="bg-gray-300"
          onClick={handleVercelLogin}
        >
          Vercel
        </Button>
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
