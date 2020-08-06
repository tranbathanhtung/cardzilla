import { memo, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useWatch } from "react-hook-form";

import * as S from "selectors/schema";

export const IsolateRepoFields = memo(({ control, fields, name }) => {
  const [github, setGithub] = useRecoilState(S.github);

  const values = useWatch({
    control,
    name,
    defaultValue: [],
  });

  useEffect(() => {
    // FIXME: conflict form onChange 
    requestAnimationFrame(() => {
      setGithub({
        ...github,
        [name]: values,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return null; 
})