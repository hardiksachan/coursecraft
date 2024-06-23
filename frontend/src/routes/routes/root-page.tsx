import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const RootPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard");
  }, [navigate]);

  return null;
};
