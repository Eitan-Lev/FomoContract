//const DepositFactory = artifacts.require("DepositFactory");
//const SgxSimulator = artifacts.require("SGXSimulator");
//const DepositConract = artifacts.require("Deposit");
var Lastpay = artifacts.require("./Lastpay.sol");

module.exports = async function(deployer, network, accounts) {
	deployer.deploy(Lastpay);
	//deployer.deploy(DepositFactory);
	//deployer.deploy(SgxSimulator);
	//var A = await deployer.deploy(DepositFactory);
	//deployer.deploy(DepositConract, accounts[0], {from: A.address, value: 2});
};
