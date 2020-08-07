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
import { REACT_APP_VERCEL_CLIENT_ID } from "constants/env";
import * as S from "selectors";

import { VercelProjectCard } from "./VercelProjectCard";
import { getVercelParams } from "./getVercelParams";

export const Deployment = memo(() => {
  const [vercelLoading, setVercelLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [vercelInfo, setVercelInfo] = useState(null);
  const theme = useRecoilValue(S.theme);
  const color = useRecoilValue(S.color);
  const [schema, setSchema] = useRecoilState(S.schemaState);
  const [user, setUser] = useRecoilState(S.user);
  const formRef = useRef({});

  const handleFormDidMount = (methods) => {
    formRef.current = methods;
  };

  const handleDeploy = async ({ name, title, trackingId }) => {
    setVercelLoading(true);
    const createReactApp = getCreateReactApp({ title, theme, trackingId });
    const defaultTemplate = getDefaultTemplate(schema);
    const app = [...createReactApp, ...defaultTemplate];
    const { file } = await saveJsZip.create(app);
    const contents = await JSZip.loadAsync(file);

    const params = await getVercelParams(contents, name);

    const newSchema = {
      ...schema,
      name,
      title,
      trackingId,
    };

    const data = await vercelAPI.vercelDeploy(user.vercel, params);

    if (!data || !user.vercel) {
      setVercelLoading(false);
      return;
    }

    const [project, createdOrUpdatedSchema] = await Promise.all([
      vercelAPI.fetchProject(user.vercel, data.name),
      createOrUpdateSchema(newSchema, user),
    ]);

    setSchema(createdOrUpdatedSchema);
    setVercelInfo({
      ...vercelInfo,
      project,
    });
    setVercelLoading(false);
  };

  const handleSaveDraft = async () => {
    setSaving(true);
    const { name, title, trackingId } = formRef.current.getValues();
    const newSchema = {
      ...schema,
      name,
      title,
      trackingId,
    };
    const createdOrUpdatedSchema = await createOrUpdateSchema(newSchema, user);
    console.log({ createdOrUpdatedSchema });
    setSaving(false);
    setSchema(createdOrUpdatedSchema);
  };

  async function handleVercelLogin() {
    try {
      if (user.vercel && user.vercel.id) {
        // some how ?
        await deleteVercelUser(user);
      }

      const popup = browser.openPopup(
        `https://vercel.com/oauth/authorize?client_id=${REACT_APP_VERCEL_CLIENT_ID}`,
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

  const handleRefreshVercelProject = async () => {
    setVercelLoading(true);
    const project = await vercelAPI.fetchProject(user.vercel, schema.name);

    setVercelInfo({
      ...vercelInfo,
      project,
    });
    setVercelLoading(false);
  };

  useEffect(() => {
    if (!user) {
      setVercelInfo(null);
      return;
    }
    if (user.vercel) {
      // fetch vercel data
      (async () => {
        setVercelLoading(true);
        const [vercelUser, project] = await Promise.all([
          vercelAPI.fetchVercelUser(user.vercel),
          vercelAPI.fetchProject(user.vercel, schema.name),
        ]);

        setVercelInfo({
          user: vercelUser,
          project,
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
      <div className="h-16 px-6 py-5 flex items-center justify-between border-b border-l border-solid border-gray-200 dark:border-gray-700">
        <p className="text-xl text-gray-700 dark:text-gray-200 font-semibold">
          {vercelInfo?.user ? vercelInfo.user.name : "Publish"}
        </p>
        {!user?.vercel ? (
          <Button
            variantColor="gray"
            className="bg-gray-300"
            onClick={handleVercelLogin}
          >
            Continue with Vercel
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
      <div className="my-6 px-6 py-5">
        <Form
          onSubmit={handleDeploy}
          onFormDidMount={handleFormDidMount}
          className="space-y-4"
          defaultValues={{
            title: schema?.title || schema?.config?.profile?.name || "",
            name: schema?.name || "",
            trackingId: schema?.trackingId || "",
          }}
        >
          <Input
            variant="outline"
            name="title"
            placeholder="Type site title..."
            label="Title"
          />

          <Input
            variant="outline"
            name="name"
            placeholder="Type site name..."
            label="Name"
            registerOptions={{
              // pattern: /[!@#$%^&*(),?":{}|<>]/,
              minLength: 4,
              maxLength: 50,
              required: "name is required",
            }}
            helperText="* Your url will be name.vercel.app if it doesn't exist"
            errorMessage="name can not have whitespaces/special or less then 4 characters"
          />

          <Input
            variant="outline"
            name="trackingId"
            placeholder="Tracking ID..."
            label="Tracking ID"
          />

          {vercelLoading && (
            <div className="w-full flex justify-center items-center">
              <Spinner />
            </div>
          )}

          {vercelInfo?.project ? (
            <VercelProjectCard
              {...vercelInfo}
              onRefresh={handleRefreshVercelProject}
              color={color}
            />
          ) : (
            <p></p>
          )}

          <ButtonGroup spacing={3} className="flex flex-no-wrap">
            <Button
              variantColor={color}
              type="submit"
              className="mt-4 bg-gray-300 w-1/2"
              isLoading={vercelLoading}
              isDisabled={vercelLoading || !user.vercel}
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
