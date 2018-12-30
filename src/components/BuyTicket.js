import React from "react";
const verifiers = require('../helpers/verifiers');
const accounts = require('../helpers/accounts');

class BuyTicket extends React.Component {
  state = { stackId: null, value: null};

  componentDidMount() {
  setInterval(() => {
   this.setState({ time: new Date().toLocaleTimeString() })
  }, 1000)
};

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

  BuyTicketMethod = value => {
    const { drizzle, drizzleState } = this.props;
  //  const contract = drizzle.contracts.FomoNoCallback;
	const contract = drizzle.contracts.Fomo;

	// let drizzle know we want to call the `set` method with `value`

	//console.log("Account purchasing ticket: ", drizzleState.accounts[this.state.account]);

	const stackId = contract.methods.buyTicket.cacheSend({
      // from: drizzleState.accounts[0],
      from: drizzleState.accounts[this.props.account],// TODO
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
    return ( !this.props.waitWinAnnounce() &&
      <form onSubmit={this.handleSubmit(this.state.value)}>
      <div>
        Buy Ticket of value [Ether]: &nbsp;
        <input
          type="text"
          onKeyDown={this.handleKeyDown}
          onChange={event => this.setState({ value: event.target.value })}
        />
        <input type="submit" value="Submit" />
        <div>{this.getTxStatus()}</div>
      </div>
	  <div>

	  </div>
      </form>
      || ((this.props.waitWinAnnounce()) &&
        <font  size="5" color="blue">
          <b>  Waiting for winner announcement</b>
        </font>
    )
    );
  }
}

export default BuyTicket;
