import React from 'react';

class TimerInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 0,
      seconds: 0,
    };
    this.setTimer = this.setTimer.bind(this);
    this.minutesInput = React.createRef();
    this.secondsInput = React.createRef();
  }

  setTime() {
    const timeInSeconds = (this.state.minutes * 60) + (this.state.seconds * 1);
    this.props.updateTimer(timeInSeconds);
  }

  setTimer(e) {
    let { value, name } = e.target;
    if (!Number.isNaN(+value)) {
      if (value.length > 2) {
        value = value.slice(1);
      }
      if (value > 59) {
        value = value.slice(1);
      }
      if (name === 'seconds') {
        this.setState({
          seconds: value,
        }, this.setTime);
      } else if (name === 'minutes') {
        this.setState({
          minutes: value,
        }, this.setTime);
      }
    }
  }

  render() {
    const { minutes, seconds } = this.state;
    return (
      <div className="timer-interface">
        <input
          type="number"
          name="minutes"
          className="minutes-interface"
          ref={this.minutesInput}
          max="59"
          value={minutes}
          onChange={this.setTimer}
        />
        :
        <input
          type="number"
          name="seconds"
          className="seconds-interface"
          ref={this.secondsInput}
          min="0"
          max="59"
          value={seconds}
          onChange={this.setTimer}
        />
      </div>
    );
  }
}

export default TimerInterface;
