import { useEffect } from "react";

export const useNotification = (trigger: boolean, callback: () => void) => {
  useEffect(() => {
    if (trigger) {
      callback();
    }
  }, [trigger]);
};
