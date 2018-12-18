import React from "react";

class ReadLastTime extends React.Component {

  constructor() {
    super();
    this.state = { lastTimeKey: null , gameTimeKey: null, lastWinTime : null};
//    this.countDown = this.countDown.bind(this);
	this.timer = 0;
  }

  componentDidMount() {
  const { drizzle } = this.props;
    //const contract = drizzle.contracts.FomoNoCallback;
	const contract = drizzle.contracts.Fomo;
	console.log("componentDidMount", drizzle)

    // let drizzle know we want to watch the `lastTime` method
  const lastTimeKey = contract.methods["lastTime"].cacheCall();
  const gameTimeKey = contract.methods["gameTime"].cacheCall();
  const lastWinTime = contract.methods["lastWinTime"].cacheCall();
  console.log(lastTimeKey);
  console.log(gameTimeKey);
  console.log(lastWinTime);

    // save the `lastTimeKey` to local component state for later reference
    this.setState({ lastTimeKey: lastTimeKey });
    this.setState({ gameTimeKey: gameTimeKey });
    this.setState({ lastWinTime: lastWinTime });

    setInterval( () => {
         this.setState({
           curTime : new Date().toLocaleString()
         })
       },1000)

	contract.events.WinnerAnnouncement({ }, (error, e) => {
		//this.setState( {lastTimeKey: lastWinTime});
	});
/*

	contract.events.PayEvent({ }, (error, e) => {
		console.log(e);
		const localContract = this.props.drizzleState.contracts.FomoNoCallback;
		var currentDate = new Date();
		var currentSeconds = Math.floor(currentDate.getTime()/ 1000);
		var lastTime = localContract.lastTime[this.state.lastTimeKey];
		var timeLeft = currentSeconds - lastTime.value;
		this.timer = setInterval(this.countDown, 1000);
		this.setState( {lastTime: localContract.lastTime[this.state.lastTimeKey], timeLeft : timeLeft});
	});
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.timeLeft - 1;
	if (seconds == 0) {

      clearInterval(this.timer);
    }
    this.setState({
      timeLeft: seconds,
    });
  */
  }

  render() {
    // get the contract state from drizzleState
	//const contract = this.props.drizzleState.contracts.FomoNoCallback;
	const contract = this.props.drizzleState.contracts.Fomo;

	// using the saved `lastTimeKey`, get the variable we're interested in
  const lastWinTime = contract.lastWinTime[this.state.lastWinTime];
  const lastTime = contract.lastTime[this.state.lastTimeKey];
  const gameTime=  contract.gameTime[this.state.gameTimeKey];
  var lastTimeUTC = new Date((lastTime &&lastTime.value)*1000);
  var timeFromLastTicket = (parseInt((new Date()).getTime()/1000))- (lastTime &&lastTime.value);
  var timeLeft = gameTime && gameTime.value - timeFromLastTicket;

  var gameIsOn = ( (lastTime && lastTime.value) -(lastWinTime && lastWinTime.value)) > 0 ? 1 :0;
  var timeLeftNonNegative = (timeLeft < 0) || (gameIsOn == 0 ) ? 0 : timeLeft;
    // if it exists, then we display its value
	// 		<p>Last Player Time: {myString && myString.value}</p>

    return 	<p><div>Last bought ticket time : {lastTimeUTC.toUTCString()}</div>
              <div>Time Left In Game: {timeLeftNonNegative} gameIsOn= {gameIsOn}</div></p>;

  }
}

export default ReadLastTime;
