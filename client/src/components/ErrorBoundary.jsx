import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-10 bg-red-900/50 text-white min-h-screen font-mono">
          <h2 className="text-3xl font-bold mb-4 font-sans">Fatal React Crash Caught</h2>
          <pre className="whitespace-pre-wrap bg-black p-6 rounded text-red-400 border border-red-500/50 mb-4 overflow-auto">
            {this.state.error && this.state.error.toString()}
          </pre>
          <pre className="whitespace-pre-wrap bg-black/80 p-6 rounded text-gray-300 overflow-auto text-sm">
            {this.state.errorInfo?.componentStack}
          </pre>
        </div>
      );
    }
    return this.props.children; 
  }
}

export default ErrorBoundary;
