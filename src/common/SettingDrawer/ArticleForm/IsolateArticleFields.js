import { memo, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useWatch } from "react-hook-form";

import * as S from "selectors/schema";

export const IsolateArticleFields = memo(({ control, fields, name }) => {
  const setArticles = useSetRecoilState(S.articles);

  const values = useWatch({
    control,
    name,
    defaultValue: [],
  });

  useEffect(() => {
    // FIXME: conflict form onChange 
    requestAnimationFrame(() => {
      setArticles(values);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return null; 
})