const Fomo = artifacts.require("./Fomo.sol");
const FomoNoCallback = artifacts.require("./FomoNoCallback.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Fomo);
	deployer.deploy(FomoNoCallback);
};
