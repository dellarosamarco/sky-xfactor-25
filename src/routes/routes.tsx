import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Suggestions from "../pages/Suggestions/Suggestions";
import PrivateRoute from "./PrivateRoute";

const Homepage = lazy(() => import("../pages/Homepage/Homepage"));
const Performances = lazy(() => import("../pages/Performances/Performances"));
const Recorder = lazy(() => import("../pages/Recorder/Recorder"));
const ThanksGiving = lazy(() => import("../pages/ThanksGiving/ThanksGiving"));

export const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/performances", element: <PrivateRoute><Performances></Performances></PrivateRoute>},
      { path: "/recorder", element: <PrivateRoute><Recorder /></PrivateRoute> },
      { path: "/thanksgiving", element: <PrivateRoute><ThanksGiving /></PrivateRoute> },
      { path: "/suggestions", element: <PrivateRoute><Suggestions /></PrivateRoute> },
      { path: "*", element: <Homepage /> },
    ],
  },
];
