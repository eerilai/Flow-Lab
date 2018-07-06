import React from 'react';
import ReactDOM from 'react-dom';
import css from './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.defaultModes = ['tuts', 'whips', 'liquid'];
    this.userModes = JSON.parse(localStorage.userModes) || [];

    this.state = {
      timer: 0,
      modes: [...this.defaultModes, ...this.userModes],
      currentMode: '',
      newMode: '',
    };

    this.activeModes = {};
    this.unusedModes = [];
    this.modeSwitchInterval = 10;
    this.lastSwitchTime = 0;

    this.changeTimer = this.changeTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
    this.setRandomMode = this.setRandomMode.bind(this);
    this.addMode = this.addMode.bind(this);
    this.deleteMode = this.deleteMode.bind(this);
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
    const i = this.userModes.indexOf(mode);
    this.userModes.splice(i, 1);
    localStorage.userModes = JSON.stringify(this.userModes);
    const modes = [...this.defaultModes, ...this.userModes];
    this.setState({
      modes,
    });
  }

  render() {
    return (
      <div className="flow_trainer">
        <div className="mode_select">
          {this.state.modes.map(mode => (
            <div className="mode" key={mode}>
              <input type="checkbox" value={mode} onChange={this.toggleMode} />
              <span>{mode}</span>
              {!this.defaultModes.includes(mode) && (
                <button
                  className="delete_button"
                  onClick={() => { this.deleteMode(mode) }}
                >
                  [X]
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="custom_mode_input">
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
            Add
          </button>
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
          <input
            type="number"
            min="1"
            max={this.state.timer}
            name="interval"
            placeholder="Interval"
            onChange={(e) => { this.modeSwitchInterval = e.target.value; }}
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
