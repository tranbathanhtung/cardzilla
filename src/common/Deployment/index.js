import * as React from "react";
import { useEffect, useState, useRef, memo } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import JSZip from "jszip";

import { Button, ButtonGroup, Spinner } from "components";
import { Input, Form } from "common/FormFields";
import {
  createOrUpdateSchema,
  createVercelUser,
  deleteVercelUser,
} from "services/firestore";
import { browser } from "services/browser";
import getDefaultTemplate from "templates/default/default-template";
import getCreateReactApp from "fixtures/create-react-app";
import saveJsZip from "services/saveJsZip";
import * as vercelAPI from "services/api/vercel";
import * as S from "selectors";

import { VercelProjectCard } from "./VercelProjectCard";
import { getVercelParams } from "./getVercelParams";

export const Deployment = memo(() => {
  const [vercelLoading, setVercelLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [vercelInfo, setVercelInfo] = useState(null);
  const theme = useRecoilValue(S.theme);
  const [schema, setSchema] = useRecoilState(S.schemaState);
  const [user, setUser] = useRecoilState(S.user);
  const formRef = useRef({});

  const handleFormDidMount = (methods) => {
    formRef.current = methods;
  };

  const handleDeploy = async ({ name, title }) => {
    setVercelLoading(true);
    const createReactApp = getCreateReactApp({ title, theme });
    const defaultTemplate = getDefaultTemplate(schema);
    const app = [...createReactApp, ...defaultTemplate];
    const { file } = await saveJsZip.create(app);
    const contents = await JSZip.loadAsync(file);
    
    const params = await getVercelParams(contents, name);

    const newSchema = {
      ...schema,
      name,
      title,
    };

    setSchema(newSchema);

    const data = await vercelAPI.vercelDeploy(user.vercel, params);

    const [project, deployments] = await Promise.all([
      vercelAPI.fetchProject(user.vercel, data.name),
      vercelAPI.fetchDeployments(user.vercel, data.name),
      createOrUpdateSchema(newSchema, user),
    ]);

    setVercelInfo({
      ...vercelInfo,
      project,
      deployments,
    });
    setVercelLoading(false);
  };

  const handleSaveDraft = async () => {
    setSaving(true);
    const { name, title } = formRef.current.getValues();
    const newSchema = {
      ...schema,
      name,
      title,
    };
    setSchema(newSchema);
    await createOrUpdateSchema(newSchema, user);
    setSaving(false);
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
        const token = await vercelAPI.fetchAccessToken(data.code);

        const newVercel = await createVercelUser(user, token);
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

  useEffect(() => {
    if (!user) {
      setVercelInfo(null);
      return;
    };
    if (user.vercel) {
      // fetch vercel data
      (async () => {
        setVercelLoading(true);
        const [vercelUser, project, deployments] = await Promise.all([
          vercelAPI.fetchVercelUser(user.vercel),
          vercelAPI.fetchProject(user.vercel, schema.name),
          vercelAPI.fetchDeployments(user.vercel, schema.name),
        ]);
        console.log({ vercelUser, project, deployments });
        setVercelInfo({
          user: vercelUser,
          project,
          deployments,
        });
        setVercelLoading(false);
      })();
    } else {
      setVercelInfo(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.vercel]);

  if (!user) return null;

  return (
    <div className="w-full h-full">
      <div className="h-16 px-4 py-3 flex items-center justify-between border-b border-l border-solid border-gray-200 dark:border-gray-700">
        <p className="text-xl text-gray-700 dark:text-gray-200 font-semibold">
          {vercelInfo?.user ? vercelInfo.user.name : "Publish"}
        </p>
        {!user?.vercel ? (
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
          onSubmit={handleDeploy}
          onFormDidMount={handleFormDidMount}
          className="space-y-4"
          defaultValues={{
            title: schema?.title || schema?.config?.profile?.name || "",
            name: schema?.name || "",
          }}
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
            rightAddon=".vercel.app"
          />

          {vercelLoading && (
            <div className="w-full flex justify-center items-center">
              <Spinner />
            </div>
          )}

          {vercelInfo?.project ? (
            <VercelProjectCard {...vercelInfo} />
          ) : (
            <p></p>
          )}

          <ButtonGroup spacing={3} className="flex flex-no-wrap">
            <Button
              variantColor="gray"
              type="submit"
              className="mt-4 bg-gray-300 w-1/2"
              isLoading={vercelLoading}
              isDisabled={vercelLoading}
            >
              Publish
            </Button>

            <Button
              variantColor="gray"
              className="mt-4 bg-gray-300 w-1/2"
              onClick={handleSaveDraft}
              isLoading={saving}
              isDisabled={saving}
            >
              Save Draft
            </Button>
          </ButtonGroup>
        </Form>
      </div>
    </div>
  );
});
