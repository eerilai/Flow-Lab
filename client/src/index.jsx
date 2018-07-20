import React from 'react';
import ReactDOM from 'react-dom';
import TimerInterface from './TimerInterface.jsx';
import css from './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.defaultModes = ['Tuts', 'Whips', 'Liquid'];
    this.userModes = JSON.parse(localStorage.userModes) || [];

    this.state = {
      timer: 0,
      seconds: 0,
      minutes: 0,
      modes: [...this.defaultModes, ...this.userModes],
      currentMode: '',
      newMode: '',
      activeModes: {},
    };

    this.unusedModes = [];
    this.modeSwitchInterval = 10;
    this.lastSwitchTime = 0;

    this.convertToMinutes = this.convertToMinutes.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
    this.setRandomMode = this.setRandomMode.bind(this);
    this.addMode = this.addMode.bind(this);
    this.deleteMode = this.deleteMode.bind(this);
  }

  setRandomMode() {
    if (this.unusedModes.length === 0) {
      this.unusedModes = Object.keys(this.state.activeModes);
    }
    const randomIndex = Math.floor(Math.random() * this.unusedModes.length);
    const currentMode = this.unusedModes[randomIndex];
    this.unusedModes.splice(randomIndex, 1);

    this.setState({
      currentMode,
    });
    this.lastSwitchTime = this.state.timer;
  }

  setTimer(timer) {
    this.setState(
      { timer },
      this.convertToMinutes,
    );
  }

  convertToMinutes() {
    const minutes = Math.floor(this.state.timer / 60);
    const seconds = this.state.timer - (minutes * 60);
    this.setState({
      seconds,
      minutes,
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
      this.setState(
        { timer: temp },
        this.convertToMinutes,
      );
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

  toggleMode(mode) {
    const { activeModes } = this.state;
    if (activeModes[mode]) {
      delete activeModes[mode];
    } else {
      activeModes[mode] = true;
    }
    this.setState({
      activeModes,
    });
  }

  addMode() {
    if (this.state.modes.includes(this.state.newMode)) {
      return;
    }
    const modes = [...this.state.modes, this.state.newMode];
    this.userModes.push(this.state.newMode);
    localStorage.userModes = JSON.stringify(this.userModes);

    this.setState({
      newMode: '',
      modes,
    });
  }

  deleteMode(mode) {
    const { activeModes } = this.state;
    delete activeModes[mode];

    const i = this.userModes.indexOf(mode);
    this.userModes.splice(i, 1);
    localStorage.userModes = JSON.stringify(this.userModes);
    const modes = [...this.defaultModes, ...this.userModes];
    this.setState({
      modes,
      activeModes,
    });
  }

  render() {
    return (
      <div className="flow-trainer">
        <div className="modes">
          <div className="mode-select">
            {this.state.modes.map(mode => (
              <div
                className={`
                  mode
                  ${Object.keys(this.state.activeModes).includes(mode) ? 'active-mode' : ''}
                  ${this.userModes.includes(mode) ? 'user-mode' : ''}
                `}
                key={mode}
                onClick={() => { this.toggleMode(mode); }}
              >
                <p>{mode}</p>
                {!this.defaultModes.includes(mode) && (
                  <button
                    className="delete-button"
                    onClick={() => { this.deleteMode(mode); }}
                  >
                    [X]
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="custom-mode-input">
            <input
              type="text"
              name="newModeInput"
              placeholder="Add a mode"
              value={this.state.newMode}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  this.addMode();
                }
              }}
              onChange={(e) => { this.setState({ newMode: e.target.value }); }}
            />
            <button
              onClick={this.addMode}
            >
              +
            </button>
          </div>
        </div>
        <div className="time-input">
          <TimerInterface updateTimer={this.setTimer} />
          <div className="time-interval">
            <input
              type="number"
              min="1"
              max={this.state.timer}
              name="interval"
              placeholder="Interval"
              onChange={(e) => { this.modeSwitchInterval = e.target.value; }}
            />
          </div>
          <div className="start-button">
            <button onClick={this.startTimer}>Start</button>
          </div>
        </div>
        <div className="flow-timer">
          <div className="timer">
            {this.state.timer}
          </div>
          <div className="timer">
            {this.state.minutes}:{this.state.seconds}
          </div>
          <div className="current-mode">
            {this.state.currentMode}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
