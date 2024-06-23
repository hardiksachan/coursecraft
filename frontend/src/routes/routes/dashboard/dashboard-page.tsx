import { useCurrentUser } from "../../../api/use-current-user";

export const DashboardPage = () => {
  const user = useCurrentUser();

  if (user.isPending) {
    return <div>Loading...</div>;
  }

  if (user.isError) {
    console.error(user.error);
    return <div>Error: {JSON.stringify(user.error)}</div>;
  }

  return <div>{JSON.stringify(user.data)}</div>;
};
