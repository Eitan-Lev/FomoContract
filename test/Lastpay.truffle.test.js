var Lastpay = artifacts.require("./Lastpay.sol");

let LastpayInstance;
let LastpastIntanceConst;

contract("Lastpay", function(accounts) {
  var electionInstance;

  before('Deploy a newLastpay contract for each run', async function() {
    LastpastInstanceConst = await Lastpay.new();
  });
  beforeEach('Deploy a single constant Laspay contract for all runs', async function() {
    LastpayInstance = await Lastpay.new();
  });


  it("initializes with two candidates", async function() {
    count = await LastpastInstanceConst.candidatesCount();
    assert.equal(count, 2);
  });

  it("it initializes the candidates with the correct values", async function() {
    let candidate;
    candidate = await LastpastInstanceConst.candidates(1);
    assert.equal(candidate[0], 1, "contains the correct id");
    assert.equal(candidate[1], "Candidate 1", "contains the correct name");
    assert.equal(candidate[2], 0, "contains the correct votes count");
    candidate = await LastpastInstanceConst.candidates(2);
    assert.equal(candidate[0], 2, "contains the correct id");
    assert.equal(candidate[1], "Candidate 2", "contains the correct name");
    assert.equal(candidate[2], 0, "contains the correct votes count");
  });

  it("allows a voter to cast a vote", async function() {
    let candidateId = 1;
    let receipt = await LastpastInstanceConst.vote(candidateId, { from: accounts[0] });
    assert.equal(receipt.logs.length, 1, "an event was triggered");
    assert.equal(receipt.logs[0].event, "votedEvent", "the event type is correct");
    assert.equal(receipt.logs[0].args._candidateId.toNumber(), candidateId, "the candidate id is correct");
    let voted = await LastpastInstanceConst.voters(accounts[0]);
    assert(voted, "the voter was marked as voted");
    let candidate = await LastpastInstanceConst.candidates(candidateId);
    let voteCount = candidate[2];
    assert.equal(voteCount, 1, "increments the candidate's vote count");
      // return Lastpay.deployed().then(function(instance) {
      //   electionInstance = instance;
      //   candidateId = 1;
      //   return electionInstance.vote(candidateId, { from: accounts[0] });
      // }).then(function(receipt) {
      //   assert.equal(receipt.logs.length, 1, "an event was triggered");
      //   assert.equal(receipt.logs[0].event, "votedEvent", "the event type is correct");
      //   assert.equal(receipt.logs[0].args._candidateId.toNumber(), candidateId, "the candidate id is correct");
      //   return electionInstance.voters(accounts[0]);
      // }).then(function(voted) {
      //   assert(voted, "the voter was marked as voted");
      //   return electionInstance.candidates(candidateId);
      // }).then(function(candidate) {
      //   var voteCount = candidate[2];
      //   assert.equal(voteCount, 1, "increments the candidate's vote count");
      // })
    });

    it.skip("throws an exception for invalid candidates", function() {
        return Lastpay.deployed().then(function(instance) {
          electionInstance = instance;
          return electionInstance.vote(99, { from: accounts[1] })
        }).then(assert.fail).catch(function(error) {
          assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
          return electionInstance.candidates(1);
        }).then(function(candidate1) {
          var voteCount = candidate1[2];
          assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
          return electionInstance.candidates(2);
        }).then(function(candidate2) {
          var voteCount = candidate2[2];
          assert.equal(voteCount, 0, "candidate 2 did not receive any votes");
        });
      });

      it.skip("throws an exception for double voting", function() {
      return Lastpay.deployed().then(function(instance) {
        electionInstance = instance;
        candidateId = 2;
        electionInstance.vote(candidateId, { from: accounts[1] });
        return electionInstance.candidates(candidateId);
      }).then(function(candidate) {
        var voteCount = candidate[2];
        assert.equal(voteCount, 1, "accepts first vote");
        // Try to vote again
        return electionInstance.vote(candidateId, { from: accounts[1] });
      }).then(assert.fail).catch(function(error) {
        assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
        return electionInstance.candidates(1);
      }).then(function(candidate1) {
        var voteCount = candidate1[2];
        assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
        return electionInstance.candidates(2);
      }).then(function(candidate2) {
        var voteCount = candidate2[2];
        assert.equal(voteCount, 1, "candidate 2 did not receive any votes");
      });
    });
});
