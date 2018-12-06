pragma solidity >=0.4.24;
//pragma solidity ^0.4.24;

contract FomoNoCallback {
	address payable public lastPlayer;
	uint public lastTime;
	address public lastWinner;
	uint public lastWinAmount;
	uint public lastWinTime;
	uint public currentWinAmount;
	uint public constant feeValue = 1;
	uint public gameTime = 1 minutes;
	address public gameCreator;

	event WinnerAnnouncement(address indexed _winner, uint indexed _amount, uint indexed _lastWinTime);

	constructor() public {
		lastPlayer = address(0);
		lastTime = now;
		lastWinner = address(0);
		lastWinAmount = 0;
		lastWinTime = 0;
		currentWinAmount = 0;
		gameCreator = msg.sender;
	}

	function buyTicket() public payable checkIfWon aboveThreshold {
		currentWinAmount += msg.value - feeValue;
		lastPlayer = msg.sender;
		lastTime = now;
	}

	function announceWinner() public payable {
		if (now > lastTime + gameTime*(1 seconds) && lastPlayer != address(0)) {
			lastPlayer.transfer(currentWinAmount);
			lastWinner = lastPlayer;
			lastWinAmount = currentWinAmount;
			currentWinAmount = 0;
			lastPlayer = address(0);
			lastTime = now;
			lastWinTime = now;
			emit WinnerAnnouncement(lastWinner, lastWinAmount, lastWinTime);
		}
	}

	function changeGameTime(uint timeInterval) public onlyMaster {
		gameTime = timeInterval;
	}

	modifier onlyMaster() {
		require(msg.sender == gameCreator, "Changing game time intervals is allowed only by the creator");
		_;
	}

	modifier checkIfWon() {
		announceWinner();
		_;
	}

	modifier aboveThreshold() {
		require(msg.value > feeValue, 'Not enough cryptocurrency was sent');
		_;
	}
}
