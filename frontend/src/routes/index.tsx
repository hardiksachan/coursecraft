import { RouteObject } from "react-router-dom";
import { RootLayout } from "./routes/root-layout";
import { RegisterPage } from "./routes/register/register-page";
import { LoginPage } from "./routes/login/login-page";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
];
