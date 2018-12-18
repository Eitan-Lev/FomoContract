import React from "react";
const verifiers = require('../helpers/verifiers');
const accounts = require('../helpers/accounts');

class BuyTicket extends React.Component {
  state = { stackId: null, value: null, account : accounts.Acc1 };

  handleKeyDown = e => {
    if (e.keyCode === 13 && e.target.value) {
      const value = this.state.value;
      if (verifiers.checkValueIsNumber(value)) this.BuyTicketMethod(value);
    }
  };

  handleSubmit = e => async event => {
    event.preventDefault();
    if (verifiers.checkValueIsNumber(e)) this.BuyTicketMethod(e);
  };

  handleChange = e =>{
	this.setState({account : accounts.getAccount(e.target.value)});
  };

  BuyTicketMethod = value => {
    const { drizzle, drizzleState } = this.props;
  //  const contract = drizzle.contracts.FomoNoCallback;
	const contract = drizzle.contracts.Fomo;

	// let drizzle know we want to call the `set` method with `value`

	//console.log("Account purchasing ticket: ", drizzleState.accounts[this.state.account]);

	const stackId = contract.methods.buyTicket.cacheSend({
      // from: drizzleState.accounts[0],
      from: drizzleState.accounts[this.state.account],// TODO
      value: value*1000000000000000000,
	  gas: 200000
    });
    // save the `stackId` for later reference
    this.setState({ stackId: stackId, value: null });
  };

  getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = this.props.drizzleState;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];

	//console.log("getTxStatus", txHash);

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    // otherwise, return the transaction status
    return `BuyTicket Transaction status: ${transactions[txHash].status}`;
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit(this.state.value)}>
      <div>
        Buy Ticket of value [Ether]: &nbsp;
        <input
          type="text"
          onKeyDown={this.handleKeyDown}
          onChange={event => this.setState({ value: event.target.value })}
        />
		<select id="userSel" onChange={this.handleChange}>
			<option value="Acc1">Account 1</option>
			<option value="Acc2">Account 2</option>
			<option value="Acc3">Account 3</option>
		</select>
        <input type="submit" value="Submit" />
        <div>{this.getTxStatus()}</div>
      </div>
	  <div>
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
