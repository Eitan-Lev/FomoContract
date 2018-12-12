import React from "react";
const verifiers = require('../helpers/verifiers');
const accounts = require('../helpers/accounts');

class SetGameTime extends React.Component {
  state = { stackId: null, value: null };

  handleKeyDown = e => {
    if (e.keyCode === 13 && e.target.value) {
      const value = e.target.value;
      if (verifiers.checkValueIsNumber(value)) this.setValue(value);
    }
  };

  handleSubmit = e => async event => {
    event.preventDefault();
    if (verifiers.checkValueIsNumber(e)) this.setValue(e);
  };

  setValue = value => {
    const { drizzle, drizzleState } = this.props;
    //const contract = drizzle.contracts.FomoNoCallback;
	const contract = drizzle.contracts.Fomo;
    
	// let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods.changeGameTime.cacheSend(value, {
      // from: drizzleState.accounts[0],
      from: drizzleState.accounts[accounts.Temp],// TODO
    });

    // save the `stackId` for later reference
    this.setState({ stackId: stackId });
  };

  getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = this.props.drizzleState;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    // otherwise, return the transaction status
    return `Change Game Time Transaction status: ${transactions[txHash].status}`;
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit(this.state.value)}>
      <div>
        Set Game Interval Time: &nbsp;
        <input
          type="text"
          onKeyDown={this.handleKeyDown}
          onChange={event => this.setState({ value: event.target.value })}
        />
        <input type="submit" value="Submit" />
        <div>{this.getTxStatus()}</div>
      </div>
      </form>
    );
  }

  // render() {
  //   return (
  //     <div>
  //       Set Game Interval Time: &nbsp;
  //       <input
  //         type="text"
  //         onKeyDown={this.handleKeyDown}
  //         onChange={event =>
  //           this.setState({ value: event.target.value })
  //         }
  //       />
  //       <div>{this.getTxStatus()}</div>
  //     </div>
  //   );
  // }
}

export default SetGameTime;
