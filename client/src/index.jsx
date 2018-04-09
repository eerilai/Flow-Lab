import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getModes = this.changeArt.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.int = 0;
    this.state = {
      arts: [],
      modes: [],
      activeModes: [],
      timer: {},
      time: 0,
      min: 0,
      sec: 0,
      currentMode: '',
    };
    this.changeInterval = 3;
    this.untilChange = this.changeInterval;
    this.training = false;
    this.modesUsed = [];
    this.modesLeft = [];
  }

  componentDidMount() {
    this.getArts();
  }

  async getArts() {
    console.log('getting arts!');
    const data = await axios.get('/data');
    this.setState({ arts: data.data });
    console.log(this.state.arts);
  }

  async setSec(val) {
    let secs = this.state.sec;
    secs = val;
    await this.setState({ sec: secs });
    this.updateTime();
  }

  async setMin(val) {
    let mins = this.state.min;
    mins = val;
    await this.setState({ min: mins });
    this.updateTime();
  }

  setTimer() {
    console.log(this.state.time);
    let mins;
    let secs;
    if (this.state.time > 50) {
      const divisor = this.state.time / 60;
      mins = Math.floor(divisor);
      secs = Math.ceil((divisor % 1) * 60);
    } else {
      mins = 0;
      secs = this.state.time;
    }
    console.log('m', mins, 's', secs);
    return {
      m: mins,
      s: secs,
    };
  }

  toggleMode({ mode }) {
    if (this.state.activeModes.indexOf(mode) !== -1) {
      const removeMode = this.state.activeModes;
      removeMode.splice(removeMode.indexOf(mode), 1);
      this.setState({ activeModes: removeMode });
    } else {
      const addMode = this.state.activeModes;
      addMode.push(mode);
      this.setState({ activeModes: addMode });
    }
    console.log('active modes: ', this.state.activeModes);
  }

  async changeArt({ art }) {
    console.log(art);
    console.log('changing arts!');
    this.setState({ activeModes: [] });
    const data = await axios.get(`/data?art=${art}`);
    this.setState({ modes: data.data });
    console.log('active modes: ', this.state.activeModes);
    console.log('new modes!:', this.state.modes);
  }

  updateTime() {
    const mins = this.state.min * 60;
    console.log('mins: ', typeof mins);
    const secs = this.state.sec;
    console.log('secs: ', typeof secs);
    const time = mins + secs;
    console.log('time: ', typeof time);
    console.log(this.state.time);
    this.setState({ time });
  }

  startTimer() {
    this.training = true;
    this.modesLeft = this.state.activeModes.slice(0);
    this.changeMode();
    this.int = setInterval(this.countDown, 1000);
  }

  countDown() {
    const time = this.state.time - 1;
    this.setState({
      timer: this.setTimer(),
      time,
    });
    if (time === 0) {
      this.int = clearInterval(this.timer);
    }
    console.log('until change: ', this.untilChange);
    this.untilChange = this.untilChange - 1;
    if (this.untilChange === 0) {
      if (this.modesLeft.length === 0) this.modesLeft = this.state.activeModes.slice(0);
      this.changeMode();
      this.untilChange = this.changeInterval;
    }
  }

  changeMode() {
    console.log(this.state.currentMode);
    console.log(this.modesLeft);
    const randomIndex = Math.floor(Math.random() * this.modesLeft.length);
    console.log('random index', randomIndex);
    const newMode = this.modesLeft[randomIndex];
    this.modesLeft.splice(randomIndex, 1);
    this.setState({
      currentMode: newMode,
    });
  }

  render() {
    return (
      <div>
        <div>
          <h1>Select your Flow!</h1>
          {this.state.arts.map(art => (
            <span className="art">{art}
              <input type="radio" name="artSelect" value={art} onChange={() => this.changeArt({ art })} />&nbsp;
            </span>))}
        </div>
        <div>
          {this.state.modes.map(mode => (
            <span>{mode}
              <input type="checkbox" checked={this.state.activeModes.indexOf(mode) !== -1} className="modeSelect" onChange={() => this.toggleMode({ mode })} />&nbsp;
            </span>))}
        </div>
        <div>
          <span><input type="number" name="minutes" value={this.state.min} min="0" onChange={e => this.setMin(e.target.value)} />:</span>
          <span><input type="number" name="seconds" value={this.state.sec} max="59" min="0" onChange={e => this.setSec(e.target.value)} /></span>
        </div>
        <div>
          <span>{this.state.timer.m}:{this.state.timer.s}</span>
          <button onClick={this.startTimer} />
        </div>
        <div>
          { this.training ? <span>{this.state.currentMode}</span> : <span /> }
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
