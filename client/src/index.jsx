import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 0,
      modes: ['tuts', 'whips', 'liquid'],
      currentMode: '',
    };

    this.activeModes = {};
    this.unusedModes = [];
    this.modeSwitchInterval = 2;
    this.lastSwitchTime = 0;

    this.changeTimer = this.changeTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
    this.setRandomMode = this.setRandomMode.bind(this);
  }

  setRandomMode() {
    if (this.unusedModes.length === 0) {
      this.unusedModes = Object.keys(this.activeModes);
    }
    const randomIndex = Math.floor(Math.random() * this.unusedModes.length);
    const currentMode = this.unusedModes[randomIndex];
    this.unusedModes.splice(randomIndex, 1);

    this.setState({
      currentMode,
    });
    this.lastSwitchTime = this.state.timer;
  }

  changeTimer(e) {
    this.setState({
      timer: e.target.value,
    });
  }

  checkTimer() {
    if (this.lastSwitchTime - this.state.timer >= this.modeSwitchInterval) {
      this.setRandomMode();
    }
  }

  decrementTimer() {
    if (this.state.timer > 0) {
      const temp = this.state.timer - 1;
      this.setState({
        timer: temp,
      });
    } else {
      clearInterval(this.time);
    }
    this.checkTimer();
  }

  startTimer() {
    this.time = setInterval(this.decrementTimer, 1000);
    this.unusedModes = [];
    this.setRandomMode();
  }

  toggleMode(e) {
    if (this.activeModes[e.target.value]) {
      delete this.activeModes[e.target.value];
    } else {
      this.activeModes[e.target.value] = true;
    }
  }

  render() {
    return (
      <div className="flow_trainer">
        <div className="mode_select">
          {this.state.modes.map(mode => (
            <div className="mode" key={mode}>
              <input type="checkbox" value={mode} onChange={this.toggleMode} />
              <span>{mode}</span>
            </div>
          ))}
        </div>
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
        <div className="active_mode">
          {this.state.currentMode}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
