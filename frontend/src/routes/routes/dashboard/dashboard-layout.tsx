import { Outlet, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../../api/use-current-user";
import { toast } from "sonner";

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const user = useCurrentUser();

  if (user.isPending) {
    return <div>Loading...</div>;
  }

  if (user.isError) {
    navigate("/login");
    toast.error("Login", {
      description: "You must be logged in to view this page.",
    });
  }

  return <Outlet />;
};
