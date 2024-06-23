import { useQuery } from "@tanstack/react-query";
import { CURRENT_USER_KEY } from "./keys";
import axios from "axios";

export const useCurrentUser = () =>
  useQuery({
    queryKey: [CURRENT_USER_KEY],
    queryFn: async () => axios.get("/api/users/me").then((res) => res.data),
    retry: false,
  });
