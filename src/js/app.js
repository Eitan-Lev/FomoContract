var downloadTimer;

App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
      App.web3Provider.enable()
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Fomo.json", function(instance) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Fomo = TruffleContract(instance);
      // Connect provider to interact with contract
      App.contracts.Fomo.setProvider(App.web3Provider);

      // get current block number in the block chain
      var startBlockNumber;
      web3.eth.getBlockNumber(function(err,  result){
        startBlockNumber = result;
        console.log("startBlockNumber ",startBlockNumber);
      })
      App.listenForEvents(startBlockNumber);

      return App.render();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function(startBlock) {
    App.contracts.Fomo.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.payEvent({}, {
        fromBlock: startBlock,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event payEvent triggered", event)
        //set timer again
        clearInterval(downloadTimer);
        App.timer();
        // Reload when a new vote is recorded
        App.render();

      });
      instance.WinnerAnnouncement({}, {
        fromBlock: startBlock,
        toBlock: 'latest'
      }).watch(function(error, event) {
          console.log("event announceWinner triggered", event)
          // Reload when a new vote is recorded
          $('form').show();
          App.render();
      });
    });
  },

  render: function() {
    var fomoInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });
    var balance;
    // Load contract data
    App.contracts.Fomo.deployed().then(function(instance) {
      fomoInstance = instance;
      web3.eth.getBalance(fomoInstance.address, 'latest', function(err, result) {
        if (err != null) {
            console.error("Error while retrieving the balance for address["+address+"]: "+err);
        }
        var _balance = Number(web3.fromWei(result, "ether"));
        balance= _balance;
        console.log("Balance for address["+fomoInstance.address+"]="+ _balance);
    });
      return fomoInstance.lastPlayer();
    }).then(function(lastPlayerInst) {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      var name = lastPlayerInst;
      console.log("winner.addr "+name);
    	// Render Last pay resual
      var candidateTemplate = "<tr><th>" + balance + "</th><td>" + name + "</td><td>"
      candidatesResults.append(candidateTemplate);

      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },

  buyTicketJs: function() {
    App.contracts.Fomo.deployed().then(function(instance) {
    var ammount =document.getElementById("myNumber").value;
    return instance.buyTicket({from:App.account,value:web3.toWei(ammount,"ether")});
    }).then(function(result) {


      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },
  //timer -- call when payEvent is triggeres set timer to 60 sec
  timer: function(time=60) {
        var timeleft = time;
        downloadTimer=setInterval(function(){
        timeleft--;
        document.getElementById("countdowntimer").textContent = timeleft;
        if(timeleft <= 0 || window.stop == 1) {
            clearInterval(downloadTimer);
            $('form').hide();
          }
        },1000);
}
};


$(function() {
  $(window).load(function() {
    App.init();
  });
});
