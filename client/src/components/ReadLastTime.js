import React from "react";

class ReadLastTime extends React.Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.FomoNoCallback;

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods.lastTime.cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey: dataKey });
  }

  render() {
    // get the contract state from drizzleState
    const { FomoNoCallback } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    const myString = FomoNoCallback.lastTime[this.state.dataKey];

    // if it exists, then we display its value
    return <p>Last Player Time: {myString && myString.value}</p>;
  }
}

export default ReadLastTime;
