import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Suggestions from "../pages/Suggestions/Suggestions";

const Homepage = lazy(() => import("../pages/Homepage/Homepage"));
const Performances = lazy(() => import("../pages/Performances/Performances"));
const Feedback = lazy(() => import("../pages/Feedback/Feedback"));
const Recorder = lazy(() => import("../pages/Recorder/Recorder"));
const ThanksGiving = lazy(() => import("../pages/ThanksGiving/ThanksGiving"));

export const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/performances", element: <Performances></Performances>},
      { path: "/feedback", element: <Feedback /> },
      { path: "/recorder", element: <Recorder /> },
      { path: "/thanksgiving", element: <ThanksGiving /> },
      { path: "/suggestions", element: <Suggestions /> },
      { path: "*", element: <Homepage /> },
    ],
  },
];
