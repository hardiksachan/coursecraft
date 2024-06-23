import { RouteObject } from "react-router-dom";
import { RootLayout } from "./routes/root-layout";
import { RegisterPage } from "./routes/register/register-page";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
];
