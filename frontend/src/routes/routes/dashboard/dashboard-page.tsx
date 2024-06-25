import { useCurrentUser } from "../../../api/use-current-user";
import * as Sentry from "@sentry/react";

export const DashboardPage = () => {
  const user = useCurrentUser();

  if (user.isPending) {
    return <div>Loading...</div>;
  }

  if (user.isError) {
    console.error(user.error);
    return <div>Error: {JSON.stringify(user.error)}</div>;
  }

  return (
    <button
      onClick={() => {
        Sentry.startSpan(
          {
            name: "Example frontend span",
            op: "test",
          },
          () => {
            throw new Error("I broke the world");
          },
        );
      }}
    >
      Break the world
    </button>
  );
};
