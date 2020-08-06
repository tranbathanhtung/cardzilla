import * as React from "react";
import { useMemo } from "react";

import { useStackState } from "../context/Stack";

import GithubStack from "./GithubStack";
import ArticleStack from "./ArticleStack";
import ContactStack from "./ContactStack";

const DetailStackContainer = () => {
  const { type } = useStackState();

  const Stack = useMemo(() => {
    switch (type) {
      case "github":
        return <GithubStack />;
      case "dev":
        return <ArticleStack />;
      case "contact":
        return <ContactStack />;
      default:
        return null;
    }
  }, [type]);

  return (
    <div className="flex flex-col overflow-hidden w-full h-full absolute top-0 bottom-0 left-full">
      {Stack}
    </div>
  );
};

export default DetailStackContainer;
