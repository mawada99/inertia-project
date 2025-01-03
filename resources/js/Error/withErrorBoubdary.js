import React, { Component } from "react";

const withErrorBoundarys = (WarppedComponent) => {
  return class ErrorBoundary extends Component {
    state = { error: null, errorInfo: null };

    // static getDerivedStateFromError(error) {
    //     // Update state so the next render will show the fallback UI.
    //     // return this.setState({ hasError: true });
    //   }
    componentDidCatch(error, errorInfo) {
      // Catch errors in any components below and re-render with error message
      this.setState({
        error: error,
        errorInfo: errorInfo,
      });
      // You can also log error messages to an error reporting service here
    }

    render() {
      if (this.state.errorInfo) {
        // Error path
        return (
          <div>
            <h2>Something went wrong.</h2>
            <details sx={{ whiteSpace: "pre-wrap" }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          </div>
        );
      }
      return <WarppedComponent />;
    }
  };
};
export default withErrorBoundarys;
