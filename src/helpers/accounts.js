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
const Acc0=0, Acc1=1, Acc2=2, Acc3=3, Creator = 4;

module.exports = {
  Creator,
  getAccount(name) {
    switch(name) {
        case "Creator":
          return 0;
        case "Acc0":
            return 0;
        case "Acc1":
		      return 1
	      case "Acc2":
		      return 2
	      case "Acc3":
		      return 3
      default:
        return (-1);
    }
  }
};
