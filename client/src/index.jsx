import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getModes = this.changeArt.bind(this);
    this.state = {
      arts: [],
      modes: [],
      activeArt: '',
      activeModes: [],
    };
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

  async changeArt({ art }) {
    console.log(art);
    console.log('changing arts!');
    this.setState({ activeModes: [] });
    const data = await axios.get(`/data?art=${art}`);
    this.setState({ modes: data.data });
    console.log('active modes: ', this.state.activeModes);
    console.log('new modes!:', this.state.modes);
  }

  toggleMode({ mode }) {
    if (this.state.activeModes.indexOf(mode) !== -1) {
      const removeMode = this.state.activeModes;
      removeMode.splice(removeMode.indexOf(mode), 0);
      this.setState({ activeModes: removeMode });
    } else {
      const addMode = this.state.activeModes;
      addMode.push(mode);
      this.setState({ activeModes: addMode });
    }
    console.log('active modes: ', this.state.activeModes);
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
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
