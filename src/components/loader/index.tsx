import { FunctionComponent } from "react";
import "./loader.css";
type props = {
  isLoading: boolean;
};

const Loader: FunctionComponent<props> = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <>
      <div className="backdrop" />
      <div className="loader-heart">
        <div></div>
      </div>
    </>
  );
};

export default Loader;
