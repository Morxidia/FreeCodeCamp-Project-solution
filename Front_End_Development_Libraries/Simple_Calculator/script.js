// const endWithOperator = /[*+‑\/]$/;
// const endWithNegativeorPostive = /[-+]$/;

const endWithOperator = /[*+\/\-]$/;  // Escaped dash
const endWithNegative = /[\-]$/;  // Escaped dash

class CalculatorApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: '',
      result: '0',
      evaluated: true
    }
    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
  }

  handleEvaluate(event) {
    const value = event.target.value;
    const { formula, result } = this.state;
    const answer = Math.round(10000000 * eval(formula)) / 10000000;
    if (value === '=') {
      this.setState({
        formula: formula,
        result: answer.toString(),
        evaluated: true,
      })
    }
  }

  handleClear(event) {
    if (event.target.value === 'AC') {
      this.setState({
        formula: '',
        result: '0',
        evaluated: true
      })
    }
  }

  handleOperator(event) {
    const value = event.target.value;
    const { formula, result, evaluated } = this.state;

    if (evaluated) {
      this.setState({
        formula: result + value,
        result: value,
        evaluated: false
      })
    }
    else if (!endWithOperator.test(formula)) {
      this.setState({
        formula: formula + value,
        result: value
      })
    }
    else if (endWithNegative.test(formula)) {
      this.setState({
        formula: formula.slice(0, formula.length - 2) + value,
        result: '0'
      })
    }
    else {
      if (value === '-') {
        this.setState({
          formula: formula + value,
          result: value
        })
      }
      else {
        this.setState({
          formula: formula.slice(0, formula.length - 1) + value,
          result: ''
        })
      }
    }
  }

  handleNumber(event) {
    const value = event.target.value;
    const { formula, result, evaluated } = this.state;
    const numberLengthLimit = 15;

    // check if limit reached
    if (this.state.result === "Limit Reached") {
      clearInterval(this.limitTimeout);
      return;
    }

    if (!(result.length >= numberLengthLimit)) {
      if (evaluated === true) {
        this.setState({
          result: value,
          formula: value,
          evaluated: false,
        })
      }
      else {
        if (formula === '0') {
          this.setState({
            result: value,
            formula: value,
          })
        }
        else if (endWithOperator.test(formula)) {
          this.setState({
            result: value,
            formula: formula + value,
          })
        }
        else {
          this.setState({
            result: result + value,
            formula: formula + value,
          })
        }
      }
    }
    else {
      const resultTemp = result
      this.setState({
        result: "Limit Reached",
      })
      setTimeout(() => this.setState(
        { result: resultTemp }
      ), 600)
    }
  }

  handleDecimal(event) {
    const value = event.target.value;
    const { formula, result, evaluated } = this.state;
    if (formula === '') {
      this.setState({
        formula: '0.',
        result: '0.',
        evaluated: false
      })
    }
    else if (endWithOperator.test(formula)) {
      this.setState({
        formula: formula + '0.',
        result: '0.',
        evaluated: false
      })
    }
    else if (!result.includes('.')) {
      this.setState({
        formula: formula + value,
        result: result + value
      })
    }
  }

  render() {
    return (
      <div id='calculator-container'>
        <OutputScreen
          formula={this.state.formula}
          result={this.state.result}
        />
        <InputButton
          handleNumber={this.handleNumber}
          handleOperator={this.handleOperator}
          handleClear={this.handleClear}
          handleEvaluate={this.handleEvaluate}
          handleDecimal={this.handleDecimal}
        />
      </div>
    )
  }
}

class InputButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id='input-container'>
        <button
          className='input-button'
          id='clear'
          onClick={this.props.handleClear}
          value='AC'
        >
          AC
        </button>
        <button
          className='input-button'
          id='divide'
          onClick={this.props.handleOperator}
          value="/"
        >
          /
        </button>
        <button
          className='input-button'
          id='multiply'
          onClick={this.props.handleOperator}
          value="*"
        >
          X
        </button>
        <button
          className='input-button'
          id='seven'
          onClick={this.props.handleNumber}
          value="7"
        >
          7
        </button>
        <button
          className='input-button'
          id='eight'
          onClick={this.props.handleNumber}
          value="8"
        >
          8
        </button>
        <button
          className='input-button'
          id='nine'
          onClick={this.props.handleNumber}
          value="9"
        >
          9
        </button>
        <button
          className='input-button'
          id='subtract'
          onClick={this.props.handleOperator}
          value="-"
        >
          -
        </button>
        <button
          className='input-button'
          id='four'
          onClick={this.props.handleNumber}
          value="4"
        >
          4
        </button>
        <button
          className='input-button'
          id='five'
          onClick={this.props.handleNumber}
          value="5"
        >
          5
        </button>
        <button
          className='input-button'
          id='six'
          onClick={this.props.handleNumber}
          value="6"
        >
          6
        </button>
        <button
          className='input-button'
          id='add'
          onClick={this.props.handleOperator}
          value="+"
        >
          +
        </button>
        <button
          className='input-button'
          id='one'
          onClick={this.props.handleNumber}
          value="1"
        >
          1
        </button>
        <button
          className='input-button'
          id='two'
          onClick={this.props.handleNumber}
          value="2"
        >
          2
        </button>
        <button
          className='input-button'
          id='three'
          onClick={this.props.handleNumber}
          value="3"
        >
          3
        </button>
        <button
          className='input-button'
          id='equals'
          onClick={this.props.handleEvaluate}
          value='='
        >
          =
        </button>
        <button
          className='input-button'
          id='zero'
          onClick={this.props.handleNumber}
          value="0"
        >
          0
        </button>
        <button
          className='input-button'
          id='decimal'
          onClick={this.props.handleDecimal}
          value='.'
        >
          .
        </button>
      </div>
    )
  }
}

class OutputScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id='screen-container'>
        <div id='formula'>
          {this.props.formula.replace('*', 'X')}
        </div>
        <div id='display'>
          {this.props.result.replace('*', 'X')}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<CalculatorApp />, document.getElementById('root'));