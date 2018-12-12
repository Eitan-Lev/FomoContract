// import React from "react";
//
// class Accounts extends React.Component {
//   constructor(props, context) {
//     super(props)
//     const { drizzle, drizzleState } = this.props;
//     // const acount1 = drizzleState.accounts[0]
//   }
//   state = { stackId: null, value: null };
//
//   account1 = () => {
//     const { drizzle, drizzleState } = this.props;
//     return drizzleState.accounts[0];
//   };
// }
//
// export default Accounts;
const Temp = 0, Creator = 1;

module.exports = {
  Temp, Creator,
  getAccount(name) {
    switch(name) {
      case "creator":
        return 1;
      case "temp":
        return 0;
      default:
        return (-1);
    }
  }
};
