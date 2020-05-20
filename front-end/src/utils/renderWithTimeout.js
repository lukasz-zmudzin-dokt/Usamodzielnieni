import React from "react";

export const renderWithTimeout = (Component, timeout_ms) => {
  return <Timeout timeout_ms={timeout_ms} children={Component} />;
};

class Timeout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
    this.interval = null;
  }

  componentDidMount() {
    this.interval = setTimeout(
      () => this.setState({ visible: false }),
      this.props.timeout_ms
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const Child = this.props.children;
    return this.state.visible ? <Child /> : null;
  }
}
