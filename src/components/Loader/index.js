import React from "react";

import { CircularProgress } from "@mui/material";
import clsx from "clsx";

import cssStyles from "./Loader.module.css";

const Loader = ({ className, size = 40, ...rest }) => {
  return (
    <div className={clsx(className, cssStyles.wrapper)}>
      <CircularProgress size={40} {...rest} />
    </div>
  );
};

export default React.memo(Loader);
