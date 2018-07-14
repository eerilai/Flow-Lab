import React from 'react';

class TimerInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 0,
      seconds: 0,
    };
    this.minutesInput = React.createRef();
    this.secondsInput = React.createRef();
    this.setSeconds = this.setSeconds.bind(this);
  }

  setSeconds(e) {
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
        });
      } else if (name === 'minutes') {
        this.setState({
          minutes: value,
        });
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
          className="minutes"
          ref={this.minutesInput}
          max="10"
          size="1"
          value={minutes}
          onChange={this.setSeconds}
        />
        :
        <input
          type="number"
          name="seconds"
          className="seconds"
          ref={this.secondsInput}
          min="0"
          max="59"
          value={seconds}
          onChange={this.setSeconds}
        />
      </div>
    );
  }
}

export default TimerInterface;
