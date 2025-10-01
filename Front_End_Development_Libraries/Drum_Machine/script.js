const audioOne = [
  {
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const audioTwo = [
  {
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: 'inactivePad'
    }
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.activatePad = this.activatePad.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);  // Start listening
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress); // Stop listening
  }

  handleKeyPress(e) {
    if (e.key.toUpperCase() === this.props.keyTrigger) {
      this.playSound();
    }
  }

  activatePad() {
    if (this.state.padStyle === 'inactivePad') {
      this.setState({
        padStyle: 'activePad'
      })
    }
    else {
      this.setState({
        padStyle: 'inactivePad'
      })
    }
  }

  playSound() {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    this.activatePad();
    sound.volume = this.props.audioVolume;
    sound.play();
    setTimeout(this.activatePad, 100);
    this.props.updateTextDisplay(this.props.clipId.replace(/-/g,' '))
  }

  render() {
    return (
      <div
        className={"drum-pad"+" "+this.state.padStyle}
        id={this.props.clipId}
        onClick={this.playSound}
      >
        <audio
          className="clip"
          id={this.props.keyTrigger}
          src={this.props.audioUrl}
          preload="auto"
        />
        {this.props.keyTrigger}
      </div>
    );
  }
}

class PadBank extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let padBank = this.props.currentPadBank.map(obj => {
      return (
        <DrumPad
          audioUrl={obj.url}
          clipId={obj.id}
          keyTrigger={obj.keyTrigger}
          audioVolume={this.props.audioVolume}
          updateTextDisplay={this.props.updateTextDisplay}
        />
      )
    });
    return (
      <div className="pad-bank">
        {padBank}
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'foo',
      currentPadBank: audioOne,
      volume: 0.3
    };
    this.changeVolume = this.changeVolume.bind(this);
    this.updateTextDisplay = this.updateTextDisplay.bind(this);
  }

  updateTextDisplay(name) {
    this.setState({
      display: name
    })
  }

  changeVolume(event) {
    this.setState({
      volume: event.target.value
    })
  }

  render() {
    return (
      <div id="drum-machine">
        <PadBank
          currentPadBank={this.state.currentPadBank}
          audioVolume={this.state.volume}
          updateTextDisplay={this.updateTextDisplay}
        />
        <div id="control-panel">
          <p id="display">{this.state.display}</p>
          <div id="volumebar-container">
            <input
              type="range" min="0" max="1" step="0.01"
              value={this.state.volume}
              onChange={this.changeVolume}
              className="slider"
              id="volume-bar" />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

