import React from "react";
import PropTypes from "prop-types";

import { Grid, Divider, Typography } from "@mui/material";

const ViewHeader = ({ title, children }) => {
  return (
    <Grid container direction="column" spacing={1}>
      <Grid item style={{ padding: "24px 24px 0 24px" }}>
        <Typography variant="h5" color="secondary">
          {title}
        </Typography>
      </Grid>
      <Grid item>{children}</Grid>
      <Grid item>
        <Divider />
      </Grid>
    </Grid>
  );
};

ViewHeader.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default React.memo(ViewHeader);
