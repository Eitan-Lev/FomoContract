import React from "react";
const verifiers = require('../helpers/verifiers');
const accounts = require('../helpers/accounts');

class ChooseAccount extends React.Component {

  constructor(props) {
    super(props);
    const { drizzle, drizzleState } = this.props;
    this.state = { account :  accounts.getAccount(accounts.Acc0) ,PublicAddr: drizzleState.accounts[0]};
  }


  handleChange = e =>{
    const { drizzle, drizzleState } = this.props;
    this.setState({account : accounts.getAccount(e.target.value)});
    this.setState({PublicAddr :drizzleState.accounts[accounts.getAccount(e.target.value)]});
    this.props.changeAccount(accounts.getAccount(e.target.value));
  }

  render() {
    return (

      <div><br /><br /><br />
        Choose Account:  &nbsp;

    		  <select id="userSel" onChange={this.handleChange}>
             <option value="Acc0">Account 0</option>
             <option value="Acc1">Account 1</option>
    			   <option value="Acc2">Account 2</option>
    			   <option value="Acc3">Account 3</option>
    		  </select>
          <header> Public Address:  &nbsp;
            {this.state.PublicAddr}
          </header>
      </div>

    );
  }
}

export default ChooseAccount;
