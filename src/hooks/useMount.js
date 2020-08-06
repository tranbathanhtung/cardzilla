import { useEffect } from "react";

export const useMount = (effect) => useEffect(effect, []);
