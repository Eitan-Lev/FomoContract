pragma solidity ^0.4.24;
//import { increaseTimeTo, duration } from './helpers/increaseTime';
//import latestTime from './helpers/latestTime';
//import "installed_contracts/oraclize-api/contracts/usingOraclize.sol";
import "./usingOraclize.sol";

contract Lastpay is usingOraclize{
      struct Candidate {
          uint id;
          string name;
          uint voteCount;
      }

      struct winner_t {
          address addr;
      }
      // Read/write Candidates
      mapping(uint => Candidate) public candidates;

      winner_t public winner;
      uint256 public closingTime = 60;
      bytes32 private LastQueryId;
      event LogInfo(string description);
      // Store Candidates Count
      uint public candidatesCount;
      // Store accounts that have voted
      mapping(address => bool) public voters;

      event votedEvent (
          uint indexed _candidateId
      );

      // ...
      // Constructor
      constructor() public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
      }
      function payLastAddr ()  public returns (bool) {
          winner.addr.transfer(address(this).balance);
          return true;
      }

      function payFound() payable public returns(bool success) {
        winner.addr = msg.sender;

        if (oraclize_getPrice("URL") > address(this).balance) {
            emit LogInfo("Oraclize query was NOT sent, please add some ETH to cover for the query fee");
            return false;
        }
        else {
              emit LogInfo("Oraclize query was sent, standing by for the answer..");
              LastQueryId = oraclize_query(closingTime, "URL", "");
              return true;
        }
      }

      function __callback(bytes32 id, string result, bytes proof) public {
          require(msg.sender == oraclize_cbAddress(), "here 1");
          if (id == LastQueryId) {
              payLastAddr();
          }
       }

      function addCandidate (string _name) private {
          candidatesCount ++;
          candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
      }
      function vote (uint _candidateId) public {
          // require that they haven't voted before
          require(!voters[msg.sender], "some random message 1 (to pass tests)");

          // require a valid candidate
          require(_candidateId > 0 && _candidateId <= candidatesCount, "some random message 1 (to pass tests)");

          // record that voter has voted
          voters[msg.sender] = true;

          // update candidate vote Count
          candidates[_candidateId].voteCount ++;

          // trigger voted event
          votedEvent(_candidateId);
      }
}
