# mywork
To Running this project on windows environment
##Installing
###Truffle
The full instructions can be find in this website:
http://www.dappuniversity.com/articles/the-ultimate-ethereum-dapp-tutorial
but the important commands are:
```
npm install -g truffle
```
###Ganache & Metamask & Node Package Manager (NPM)
Install Ganache ,Metamask and NPM as describe in this tutorial
http://www.dappuniversity.com/articles/the-ultimate-ethereum-dapp-tutorial

##Oraclize and Etherium bridge
To support Oraclize you need :
1.install git
2.install python 
3.Run from administer power-shell (to avoid this error:https://github.com/freearhey/web-learn/issues/2)
```
npm install --global --production windows-build-tools  
```
4. install ethereum bridge and orcalize according this tutorial:
https://medium.com/coinmonks/how-to-create-a-dapp-using-truffle-oraclize-ethereum-bridge-and-webpack-9cb84b8f6bcb



##Running 
### TO run with frontend website with ganache
*open Ganache (set it to port 7545)
*Run NPM:
**open cmd window 
**Go to the project folder (Lastpay folder)
**run NPM liteserver from 
```
npm run dev
```
* Run etherium-bridge:
**open cmd window
**Go to ethereum bridge folder 
**run Etherium bridge command:
```
node bridge -a 9 -H 127.0.0.1 -p 7545 --dev
```
*Run truffle:
**open cmd window 
**Go to the project folder (Lastpay folder)
**deploy the contract using:
```
truffle.cmd migrate --reset --all
```
*open firefox 
*connect to metamask
*open website:http://localhost:3000/

and Thats It..

###running with Truffle console
in addition we you run commands from the truffle console (using the same cmd window we deploy the contract)
and run tuffle console:
```
truffle.cmd console
```
command for the console:
*Deploying contract:
```
Lastpay.deployed().then(function(instance) { app = instance })
```
*call payfound function:
```
app.payFound({from:web3.eth.accounts[3],value:web3.toWei(10,"ether")})
```
*check balnce option
```
web3.fromWei(web3.eth.getBalance(app.address),"ether").toString()
```