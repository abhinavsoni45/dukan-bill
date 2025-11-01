import { useCallback, useState } from "react";
import { API_URL } from "../constants/urls";
import { snackVar } from "../constants/snack";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../constants/errors";
const useCountGirvis = () => {
  const [count, setCount] = useState<number | undefined>();
  const countGirvis = useCallback(async () => {
    const res = await fetch(`${API_URL}/girvi/count`);
    if (!res.ok) {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
      return;
    }
    setCount(parseInt(await res.text()));
  }, []);
  return { count, countGirvis };
};
export { useCountGirvis };
