import React, { Component } from 'react';// eslint-disable-next-line
import logo from './logo.svg';// eslint-disable-line
import './App.css';
import ReadGameTime from "./components/ReadGameTime";
import BuyTicket from "./components/BuyTicket";
import SetGameTime from "./components/SetGameTime";
import ReadLastTime from "./components/ReadLastTime";
import ReadCurrentWinAmount from "./components/ReadCurrentWinAmount";

class App extends Component {
  state = { loading: true, drizzleState: null };

  componentDidMount() {
    const { drizzle } = this.props;

    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {

      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState: drizzleState });
      }
    });
  }

  compomentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) return "Loading Drizzle...";
    return (
      <div className="App">
        <ReadLastTime
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
        <ReadGameTime
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
        <SetGameTime
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
        <BuyTicket
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
        <ReadCurrentWinAmount
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
      </div>
    );
  }
}

export default App;