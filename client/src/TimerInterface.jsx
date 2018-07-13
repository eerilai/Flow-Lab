import React from 'react';

class TimerInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: '0',
      seconds: '00',
    };
    this.minutesInput = React.createRef();
    this.secondsInput = React.createRef();
    this.setMinutes = this.setMinutes.bind(this);
    this.setSeconds = this.setSeconds.bind(this);
  }

  setMinutes(e) {
    if (!Number.isNaN(+e.key)) {
      this.setState({
        minutes: '0',
      });
      this.setState({
        minutes: e.key,
      });
      this.secondsInput.current.focus();
    }
  }

  setSeconds(e) {
    let { value } = e.target;
    if (!Number.isNaN(+value)) {
      if (value.length > 2) {
        value = value.slice(1);
      }
      this.setState({
        seconds: value,
      });
    }
  }

  render() {
    const { minutes, seconds } = this.state;
    return (
      <div className="timer-interface">
        <input
          type="number"
          className="minutes"
          ref={this.minutesInput}
          max="10"
          size="1"
          value={minutes}
          onKeyPress={this.setMinutes}
        />
        :
        <input
          type="number"
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
