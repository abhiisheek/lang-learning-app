import React from "react";
import PropTypes from "prop-types";

import { Snackbar, Alert } from "@mui/material";

const Notifier = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

Notifier.propTypes = {
  open: PropTypes.bool.isRequired,
  severity: PropTypes.oneOf(["success", "warning", "info", "error"]),
};

export default React.memo(Notifier);
