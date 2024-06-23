import { useEffect } from "react";
import { toast } from "sonner";

type Errorable =
  | {
      isError: false;
    }
  | {
      isError: true;
      error: any;
    };

export const useErrorNotification = (
  errorable: Errorable,
  {
    title,
  }: {
    title: string;
  },
) => {
  useEffect(() => {
    if (errorable.isError) {
      toast.error(title, {
        description: errorable.error?.response?.data.message,
      });
    }
  }, [errorable.isError]);
};
