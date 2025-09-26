import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Feedback from "../pages/Feedback/Feedback";

const Homepage = lazy(() => import("../pages/Homepage/Homepage"));
const Performances = lazy(() => import("../pages/Performances/Performances"));

export const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/performances", element: <Performances></Performances>},
      { path: "/feedback", element: <Feedback /> },
      { path: "*", element: <Homepage /> },
    ],
  },
];
