import { memo, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useWatch } from "react-hook-form";

import * as S from "selectors/schema";

export const IsolateProfileFields = memo(({ control, fields, name }) => {
  const [profile, setProfile] = useRecoilState(S.profile);
  const values = useWatch({
    control,
    name,
    defaultValue: [],
  });

  useEffect(() => {
    // FIXME: conflict form onChange 
    requestAnimationFrame(() => {
      setProfile({
        ...profile,
        [name]: values,
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return null; 
})