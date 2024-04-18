import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import Typography from "@mui/material/Typography";


class ErrorBoundary extends PureComponent {
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;

    if (
      location.pathname !== prevProps.location.pathname ||
      location.search !== prevProps.location.search
    ) {
      this.setState({ hasError: false });
    }
  }

  componentDidCatch(error, errorInfo) {
    console.error(
      "Error occured :: ",
      error && error.message,
      errorInfo.componentStack
    );
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <Typography variant="h4" gutterBottom component="div">
          Error Occured
        </Typography>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;
