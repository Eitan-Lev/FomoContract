const fomoContract = artifacts.require("./FomoNoCallback.sol");

let FomoInstance;
let Player1;
let Player2;
let Player3;
let gameCreator;

const ticket1 = 3;
const ticket2 = 4;
const ticket3 = 2;
const feeValue = 1;
let totalAmount = 0;
const timeInterval = 10;

contract("fomoNoCallback", function(accounts) {
	gameCreator = accounts[0];
	Player1 = accounts[1];
	Player2 = accounts[2];
	Player3 = accounts[3];

	beforeEach('Deploying a new FOMO contract', async function() {
		FomoInstance = await fomoContract.new({from: gameCreator});
		totalAmount = 0;
		await FomoInstance.changeGameTime(timeInterval, {from: gameCreator});
	});

	describe('E2E testing of FOMO contract', function() {
		it('expecting Player 1 to win', async function() {
			await FomoInstance.buyTicket({from: Player1, value: ticket1});
			contractBalance = (await FomoInstance.currentWinAmount()).toNumber();
			totalAmount = ticket1 - feeValue;
			assert.equal(contractBalance, totalAmount);
			await FomoInstance.buyTicket({from: Player2, value: ticket2});
			contractBalance = (await FomoInstance.currentWinAmount()).toNumber();
			totalAmount = totalAmount + ticket2 - feeValue;
			assert.equal(contractBalance, totalAmount);
			await FomoInstance.buyTicket({from: Player1, value: ticket3});
			contractBalance = (await FomoInstance.currentWinAmount()).toNumber();
			totalAmount = totalAmount + ticket3 - feeValue;
			assert.equal(contractBalance, totalAmount);

			await secondsSleep(timeInterval/2);
			receipt = await FomoInstance.announceWinner({value: 3});
			assert.equal(receipt.logs.length, 0);
			contractBalance = (await FomoInstance.currentWinAmount()).toNumber();
			assert.equal(contractBalance, totalAmount);
			lastWinAmount = (await FomoInstance.lastWinAmount()).toNumber();
			assert.equal(lastWinAmount, 0);
			
			//2 to definitelly be after interval:
			await secondsSleep(timeInterval/2 + 2);
			receipt = await FomoInstance.announceWinner({value: 3});
			lastPlayer = (await FomoInstance.lastPlayer());
			currentWinAmount = (await FomoInstance.currentWinAmount()).toNumber();
			lastWinner = await FomoInstance.lastWinner();
			lastWinAmount = (await FomoInstance.lastWinAmount()).toNumber();
			assert.equal(lastPlayer, 0);
			assert.equal(currentWinAmount, 0);
			assert.equal(lastWinner, Player1);
			assert.equal(lastWinAmount, totalAmount);
			assert.equal(lastWinner, receipt.logs[0].args._winner);
			assert.equal(lastWinAmount, receipt.logs[0].args._amount);
			lastWinTime = (receipt.logs[0].args._lastWinTime).toNumber();
			sameLastWinTime = (await FomoInstance.lastWinTime()).toNumber();
			assert.equal(lastWinTime, sameLastWinTime);

			receipt = await FomoInstance.announceWinner({value: 3});
			assert.equal(receipt.logs.length, 0, "expected for no events to be emitted");
		});
	});
});


let secondsSleep = async function(seconds) {
	await new Promise(resolve => setTimeout(resolve, seconds*1000));
};








