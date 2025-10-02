import React from "react";
import { useLoader } from "../../context/LoaderContext";
import "./Loader.scss";

const Loader = () => {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return (
    <div className="loader-overlay">
      <div className="loader-spinner"></div>
    </div>
  );
};

export default Loader;
