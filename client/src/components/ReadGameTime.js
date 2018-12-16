import React from "react";

class ReadGameTime extends React.Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.FomoNoCallback;
	//const contract = drizzle.contracts.Fomo;
	
    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods["gameTime"].cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey: dataKey });
  }

  render() {
    // get the contract state from drizzleState
    //const { FomoNoCallback } = this.props.drizzleState.contracts;
	const contract = this.props.drizzleState.contracts.FomoNoCallback;
	//const contract = this.props.drizzleState.contracts.Fomo;
	
    // const {events} = FomoNoCallback.events;
    // TODO
    // console.log(event);

    // using the saved `dataKey`, get the variable we're interested in
    const myString = contract.gameTime[this.state.dataKey];

    // if it exists, then we display its value
    return <p>Game Interval Time is: {myString && myString.value}</p>;
  }
}

export default ReadGameTime;
