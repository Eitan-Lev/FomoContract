import React from "react";

class ReadLastTime extends React.Component {

  constructor() {
    super();
    this.state = { lastTimeKey: null , gameTimeKey: null, lastWinTime : null, waitWinnerAnnaounce: 0};
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
  }

  timeLeft (){
    const contract = this.props.drizzleState.contracts.Fomo;

    const lastWinTime = contract.lastWinTime[this.state.lastWinTime];
    const lastTime = contract.lastTime[this.state.lastTimeKey];
    const gameTime=  contract.gameTime[this.state.gameTimeKey];
    var lastTimeUTC = new Date((lastTime &&lastTime.value)*1000);
    var timeFromLastTicket = (parseInt((new Date()).getTime()/1000))- (lastTime &&lastTime.value);
    var timeLeft = gameTime && gameTime.value - timeFromLastTicket;

    var gameIsOn = ( (lastTime && lastTime.value) -(lastWinTime && lastWinTime.value)) > 0 ? 1 :0;
    var timeLeftNonNegative = (timeLeft < 0) || (gameIsOn == 0 ) ? 0 : timeLeft;
    var result;
    ((timeLeft < 0) && ((lastWinTime && lastWinTime.value) != (lastTime &&lastTime.value)) )? result=true : result = false;
    this.props.waitWinnerAnnaounce(result);
    return timeLeftNonNegative;
  }

  render() {
    return 	<p>
              <font size="5">
                <div>Time Left For Game: {this.timeLeft()} </div>
              </font>
            </p>;

  }
}

export default ReadLastTime;
