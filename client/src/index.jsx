import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 0,
    };
    let time;
    this.changeTimer = this.changeTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
  }

  changeTimer(e) {
    this.setState({
      timer: e.target.value,
    });
  }

  checkTimer() {
    if (this.state.timer === 0) {
      clearInterval(this.time);
    }
  }

  decrementTimer() {
    let temp = --this.state.timer;
    this.setState({
      timer: temp,
    });
    this.checkTimer();
  }

  startTimer(e) {
    this.time = setInterval(this.decrementTimer, 1000);
  }

  render() {
    return (
      <div className="flow_trainer">
        <div className="mode_select" />
        <div className="time_input">
          <input
            type="number"
            min="0"
            max="59"
            name="timer_seconds"
            placeholder="Seconds"
            onChange={this.changeTimer}
          />
        </div>
        <div className="start_button">
          <button onClick={this.startTimer}>Start</button>
        </div>
        <div className="timer">
          {this.state.timer}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
