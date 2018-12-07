import React from "react";

class BuyTicket extends React.Component {
  state = { stackId: null, value: null };

  handleKeyDown = e => {
    if (e.keyCode === 13 && e.target.value) {
      this.setValueIfValid(e.target.value);
    }
  };

  handleSubmit = e => async event => {
    event.preventDefault();
    if (e) this.setValueIfValid(e);
  };

  setValueIfValid = value => {
    var regex=/^[0-9]+$/;
    if (value && (value).match(regex)) this.setValue(value);
  };

  setValue = value => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.FomoNoCallback;

    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods["buyTicket"].cacheSend({
      from: drizzleState.accounts[0],
      value: value
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
    return `BuyTicket Transaction status: ${transactions[txHash].status}`;
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit(this.state.value)}>
      <div>
        Buy Ticket of value: &nbsp;
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
  //       Buy Ticket of value: &nbsp;
  //       <input
  //         type="text"
  //         onKeyDown={this.handleKeyDown}
  //         />
  //       <div>{this.getTxStatus()}</div>
  //     </div>
  //   );
  // }
}

export default BuyTicket;
