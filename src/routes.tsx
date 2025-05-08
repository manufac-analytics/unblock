import { App } from "./app";
import { ErrorPage } from "./pages/ErrorPage";
import { PageA } from "./pages/Page-A";
import { PageB } from "./pages/Page-B";
import { createBrowserRouter } from "react-router";

export const Routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "page-a",
        element: <PageA />,
      },
      {
        path: "page-b",
        element: <PageB />,
      },
    ],
  },
]);
