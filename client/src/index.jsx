import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 0,
    };
    this.changeTimer = this.changeTimer.bind(this);
  }

  changeTimer(e) {
    this.setState({
      timer: e.target.value,
    });
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
        <div className="timer">
          {this.state.timer}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
