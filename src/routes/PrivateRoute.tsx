import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuth = auth.currentUser;
  console.log(auth.currentUser?.email);
  return isAuth ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
