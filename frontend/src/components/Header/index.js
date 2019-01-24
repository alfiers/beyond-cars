import React, { PureComponent } from "react";

import Logo from "../../assets/logo.png";
import "./index.css";

export default () => {
  return (
    <div className="app-header">
      <img src={Logo} />
    </div>
  );
};
