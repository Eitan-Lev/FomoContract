import React from "react";

class ReadLastTime extends React.Component {
	
  constructor() {
    super();
    this.state = { dataKey: null , lastTime: null, timeLeft : null};
    this.countDown = this.countDown.bind(this);
	this.timer = 0;
  }
  
  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.FomoNoCallback;
	//const contract = drizzle.contracts.Fomo;
	console.log("componentDidMount", drizzle)
	
    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods.lastTime.cacheCall();
	console.log(dataKey);
	
    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey: dataKey });
	
	contract.events.WinnerAnnouncement({ }, (error, e) => {
		this.setState( {lastTime: null});
	});
	
	contract.events.PayEvent({ }, (error, e) => {
		console.log(e);
		const localContract = this.props.drizzleState.contracts.FomoNoCallback;
		var currentDate = new Date();
		var currentSeconds = Math.floor(currentDate.getTime()/ 1000);
		var lastTime = localContract.lastTime[this.state.dataKey];
		var timeLeft = currentSeconds - lastTime.value;
		this.timer = setInterval(this.countDown, 1000);
		this.setState( {lastTime: localContract.lastTime[this.state.dataKey], timeLeft : timeLeft});
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
  }
  
  render() {
    // get the contract state from drizzleState
	const contract = this.props.drizzleState.contracts.FomoNoCallback;
	//const contract = this.props.drizzleState.contracts.Fomo;
	
	// using the saved `dataKey`, get the variable we're interested in
    const myString = this.state.lastTime;
	const timeLeft = this.state.timeLeft;
	
    // if it exists, then we display its value
	// 		<p>Last Player Time: {myString && myString.value}</p>

    return 	<p>Time Left In Game: {timeLeft}</p>;
  }
}

export default ReadLastTime;
