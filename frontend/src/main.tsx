import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes/index.tsx";
import axios from "axios";
import * as Sentry from "@sentry/react";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL!;
axios.defaults.withCredentials = true;

Sentry.init({
  dsn: "https://95f19ef7d18213a33e781afb36fd9652@o4507483471151104.ingest.de.sentry.io/4507488785268816",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", import.meta.env.VITE_API_BASE_URL!],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
