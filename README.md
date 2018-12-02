# FOMO contract

[![Build Status](https://dev.azure.com/eitanlev/FomoDevOps/_apis/build/status/Eitan-Lev.FomoContract?branchName=master)](https://dev.azure.com/eitanlev/FomoDevOps/_build/latest?definitionId=8)

Note that these instructions are dynamic, since I don't want to install anything that might be relevant, only the ones we actually need.

### Initial use of this repository:
1. Create a directory for the repository.
1. do: "git clone https://github.com/Eitan-Lev/FomoContract.git"

### After each clone you do (or directory change):
1. npm init (press enter till it's done)
1. npm install --save solc ganache-cli
1. npm i truffle\
*(-- END OF VERSION 0 --)*
1. npm install truffle mocha mocha-junit-reporter --save-dev\
*(-- END OF VERSION 1 --)*


After doing above steps the truffle commands should all work.

### How to know everything works:
1. run the following (after all the previous steps) from the project folder:
    1. in a seperate terminal window: "ganache-cli -b 3"\
    This should start a ganache instance and print all sorts of things. Wait a second for it to finish.
    In this window you can see all the actions you perform on the blockchain if you work locally.
    1. truffle compile\
    This should print "Compiling ./contracts/..." and "Writing artifacts to ./build/contracts"
    1. truffle migrate\
    This should print out many migrations with addresses.
    If you configured the "truffle.js" to the Rinkby network (does not apply right now) then these addresses are the actuall ones the contracts are deployed to each time you migrate.
    1. truffle test\
    This should produce an output of what network to use and a summary of the tests success.
1. do "git status"- nothing should have been added (no files changed).

### What *not* to do:
1. Do not under any circumstances change the gitignore file
1. Work on a personal branch (not master), it's ok to push it.\
Do not merge to master if there is any chance it will cause trouble to anyone else.
1. before push, do pull and fix merge issues.
1. Do not force push!
1. Do not update "package.json" or "truffle.js" or "truffle-cmd.js" without consulting with others first.\
Changes to these files can be hazardous to the repository!

### How to run with front end (in general):
1. Use a localhost or remote "real" website, doesn't matter.
1. Deploy the FOMO contract or any other relevant one (anyway you want, such as Remix).
1. Keep the address, insert it to the appropriate place in the front end code (find it, has to be somewhere).
1. No need to redeploy the contract each time, we can use the same deployed one unless we all use it once.
1. Interacting with front end requires the use of Metamask.

### Points to note
1. if no truffle command works (this probably means you are working on windows), change all "truffle" commands to "node_modules\.bin\truffle". This is Windows Path variable anoyance. 
1. Any new contract you want to add (there should theoretically be only one), you place in the contracts folder. This will automatically cause "truffle compile" to try to compile it.
1. This README currently doesn't explain how to deploy or test contracts (if you try to migrate or test you will that any contract you add doesn't show there).\
I will explain this later, no worries. 
