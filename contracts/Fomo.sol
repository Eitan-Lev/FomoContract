pragma solidity ^0.4.24;
//import { increaseTimeTo, duration } from './helpers/increaseTime';
//import latestTime from './helpers/latestTime';
//import "installed_contracts/oraclize-api/contracts/usingOraclize.sol";
import "./usingOraclize.sol";

contract Fomo is usingOraclize{

      //Contract variable
      address public lastPlayer;
      uint public lastTime;
	    uint public currentWinAmount;

      //Last contract variables
      address public lastWinner;
  	  uint public lastWinAmount;
  	  uint public lastWinTime;

      //contract configuration
  	  uint public constant minFeeValue = 1;
  	  uint256 public gameTime = 60; //Seconds
  	  address public gameCreator;

      //store orcalize call back id
      bytes32 private LastQueryId;


      event payEvent (address _pay_addr);
      //event WinnerAnnouncement(address indexed _winner, uint indexed _amount, uint indexed _lastWinTime);
      event WinnerAnnouncement(address indexed _winner);
      event LogInfo(string description);

      // ...
      // Constructor
      constructor() public {
            lastPlayer = 0;
        		lastTime = now;
        		lastWinner = 0;
        		lastWinAmount = 0;
        		lastWinTime = 0;
        		currentWinAmount = 0;
        		gameCreator = msg.sender;
      }

      function announceWinner ()  public returns (bool) {
          lastPlayer.transfer(address(this).balance);
          lastWinner = lastPlayer;
          lastWinAmount = currentWinAmount;
    		  currentWinAmount = 0;
    		  lastPlayer = 0;
    		  lastTime = now;
    		  lastWinTime = now;
          emit WinnerAnnouncement(lastWinner);//(lastWinner, lastWinAmount, lastWinTime);
          return true;
      }

      function buyTicket() payable public returns(bool success) {
          require(msg.value > minFeeValue, 'Oraclize query was NOT sent, please add some ETH to cover for the query fee');
          currentWinAmount += msg.value - minFeeValue;
          lastPlayer = msg.sender;
          lastTime = now;

          //emit LogInfo("Oraclize query was sent, standing by for the answer..");
          emit payEvent(msg.sender);
          LastQueryId = oraclize_query(gameTime, "URL", "");
          return true;
      }

      function __callback(bytes32 id, string result, bytes proof) public {
          if (id == LastQueryId) {
              announceWinner();
            }
       }

      function changeGameTime(uint timeInterval) public onlyMaster {
     		 gameTime = timeInterval;
     	}

     	modifier onlyMaster() {
     		 require(msg.sender == gameCreator, "Changing game time intervals is allowed only by the creator");
     		  _;
     	}


}
