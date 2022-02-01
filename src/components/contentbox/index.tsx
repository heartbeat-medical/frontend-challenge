import React, { FunctionComponent } from "react";
import "./contentbox.css";

type props = {
  children: React.ReactNode;
};

const ContentBox: FunctionComponent<props> = ({ children }) => {
  return (
    <div className="site-content">
      <div className="site-heading">
        <h1>Welcome to Heartbeat 🏥</h1>
        <h3>Please load the patients using the button below or search</h3>
      </div>
      <div className="site-box">
        <div className="site-input-box">{children}</div>
      </div>
    </div>
  );
};

export default ContentBox;
