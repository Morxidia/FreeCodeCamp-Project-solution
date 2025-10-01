const beep_clock = 'https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'

class App extends React.Component {
  constructor(props){
    super(props)
    // use 'session' or 'break' to indicate time state
    this.state = {
      start: false,
      timeState: 'session',
      mainTime: 25,
      breakTime: 5,
      timeLeft: 25*60,
      timeInterval: null
    }
    this.addMainTime = this.addMainTime.bind(this);
    this.subtMainTime = this.subtMainTime.bind(this);
    this.subtBreakTime = this.subtBreakTime.bind(this);
    this.addBreakTime = this.addBreakTime.bind(this);
    this.startStop = this.startStop.bind(this);
    this.reset = this.reset.bind(this);
    this.countDown = this.countDown.bind(this);
    this.playSound = this.playSound.bind(this);
    this.toggleVolume = this.toggleVolume.bind(this);
  }

  subtMainTime(){
    const {start, timeState, mainTime, breakTime, timeLeft, timeInterval} = this.state;
    if(!start){
      const currentTime = mainTime <= 1? mainTime : mainTime - 1;
      if(timeState === 'session'){
        this.setState({
          mainTime: currentTime,
          timeLeft: currentTime * 60
        })
      }
      else{
        this.setState({
          mainTime: currentTime,
        })
      }
    }
  }

  addMainTime(){
    const {start, timeState, mainTime, breakTime, timeLeft, timeInterval} = this.state;
    if(!start){
      const currentTime = mainTime >= 60? mainTime : mainTime + 1;
      if(timeState === 'session'){
        this.setState({
          mainTime: currentTime,
          timeLeft: currentTime * 60
        })
      }
      else{
        this.setState({
          mainTime: currentTime,
        })
      }
    }
  }

  subtBreakTime(){
    const {start, timeState, mainTime, breakTime, timeLeft, timeInterval} = this.state;
    if(!start){
      const currentTime = breakTime <= 1? breakTime : breakTime - 1;
      if(timeState === 'break'){
        this.setState({
          breakTime: currentTime,
          timeLeft: currentTime * 60
        })
      }
      else{
        this.setState({
          breakTime: currentTime,
        })
      }
    }
  }

  addBreakTime(){
    const {start, timeState, mainTime, breakTime, timeLeft, timeInterval} = this.state;
    if(!start){
      const currentTime =breakTime >=60? breakTime : breakTime + 1;
      if(timeState === 'break'){
        this.setState({
          breakTime: currentTime,
          timeLeft: currentTime * 60
        })
      }
      else{
        this.setState({
          breakTime: currentTime,
        })
      }
    }
  }

  countDown(){
    const {start, timeState, mainTime, breakTime, timeLeft, timeInterval} = this.state;
    const currTime = timeLeft - 1;
    this.setState({
      timeLeft: currTime
    })
    if(currTime === 0){
      this.playSound();
      this.startStop();
      this.setState({
        timeState: timeState === 'session'? 'session end' : 'break end'
      })
      setTimeout(() => {
        if(timeState === 'session'){
          this.setState({
            timeState: 'break',
            timeLeft: breakTime * 60
          })
        }
        else{
          this.setState({
            timeState: 'session',
            timeLeft: mainTime * 60
          })
        }
        this.startStop();
      }, 1500)
    }
  }

  playSound(){
    const sound = document.getElementById("beep");
    sound.volume = this.state.volume;
    sound.play();
  }

  startStop(){
    if(!this.state.start){
      this.state.timeInterval = setInterval(this.countDown,1000);
      this.setState({
        start: true,
      })
    }
    else{
      clearInterval(this.state.timeInterval);
      this.setState({
        start: false,
      })
    }
  }

  reset(){
    clearInterval(this.state.timeInterval);
    const sound = document.getElementById("beep");
    sound.volume = 0.5;
    sound.pause();
    sound.currentTime = 0;
    this.setState({
      start: false,
      timeState: 'session',
      mainTime: 25,
      breakTime: 5,
      timeLeft: 25*60,
      volume: 0.5,
      timeInterval: null
    })
  }

  toggleVolume(){
    if(this.state.volume === 0){
      this.setState({
        volume: 0.5
      })
    }
    else{
      this.setState({
        volume: 0
      })
    }
  }

  render(){
    return(
      <div id="timer-container">
        <h1>25 + 5 Clock</h1>
        <div className="wrapper" id="time-control-wrapper">
          <Session
            addMainTime={this.addMainTime}
            subtMainTime={this.subtMainTime}
            mainTime={this.state.mainTime}
          />
          <Break
            addBreakTime={this.addBreakTime}
            subtBreakTime={this.subtBreakTime}
            breakTime={this.state.breakTime}
          />
        </div>
        <div className="wrapper">
          <Timer
            Time={this.state.timeLeft}
            TimeLabel={this.state.timeState}
          />
        </div>
        <div className="wrapper" id="timer-control">
          <Controls
            startStop={this.startStop}
            reset={this.reset}
            timestart={this.state.start}
            volume={this.state.volume}
            toggleVolume={this.toggleVolume}
          />
        </div>
        <audio src={beep_clock} id="beep"></audio>
      </div>
    )
  }
}

const Break = (props) => {
  return (
    <div id="break-wrapper">
      <h5 id="break-label">Break Length</h5>
      <div id="break-controls-container">
        <i class="bi bi-caret-down-fill" id="break-decrement" onClick={props.subtBreakTime}/>
        <p className="screen" id="break-length">{props.breakTime < 10? `0${props.breakTime}`: `${props.breakTime}`}</p>
        <i class="bi bi-caret-up-fill" id="break-increment" onClick={props.addBreakTime}/>
      </div>
    </div>
  )
}

const Session = (props) => {
  return(
    <div id="session-wrapper">
      <h5 id="session-label">Session Length</h5>
      <div id="session-controls-container">
        <i class="bi bi-caret-down-fill" id="session-decrement" onClick={props.subtMainTime}/>
        <p className="screen" id="session-length">{props.mainTime < 10? `0${props.mainTime}`: `${props.mainTime}`}</p>
        <i class="bi bi-caret-up-fill" id="session-increment" onClick={props.addMainTime}/>
      </div>
    </div>
  )
}

const Timer = (props) => {
  const minute = Math.floor(props.Time / 60);
  const second = props.Time % 60;
  return(
    <div className="screen" id="timer-screen-container">
      <h3 id="timer-label">
        {props.TimeLabel}
      </h3>
      <h1 id="time-left">
        {minute < 10? `0${minute}`:minute}:{second < 10? `0${second}`:second}
      </h1>
    </div>
  )
}

const Controls = (props) => {
  return(
    <div id="control-wrapper">
      <div id="start_stop" onClick={props.startStop}>
        <i className={props.timestart? 'bi bi-pause-fill' : 'bi bi-play-fill'} id="start-icon"/>
      </div>
      <div id="reset" onClick={props.reset}>
        <i class="bi bi-bootstrap-reboot"/>
      </div>
      <div id="volume" onClick={props.toggleVolume}>
        <i class={props.volume === 0? 'bi bi-bell-slash' : 'bi bi-bell'}/>
      </div>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'));