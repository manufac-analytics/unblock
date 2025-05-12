import { App } from "./app";
import { ErrorPage } from "./pages/ErrorPage";
import { Home } from "./pages/Home";
import { createBrowserRouter } from "react-router";

export const Routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
