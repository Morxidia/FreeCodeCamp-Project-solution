const CHANGE = "CHANGE";
const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

marked.setOptions({
  breaks: true
});

const changeText = (text) => {
  return {
    type: CHANGE,
    text: text,
  };
};

const textInputReducer = (state = '', action) => {
  switch (action.type) {
    case CHANGE:
      return action.text;
    default:
      return state;
  }
};

const store = Redux.createStore(textInputReducer, placeholder);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorMax: false,
      previewMax: false
    }
    this.updateText = this.updateText.bind(this);
    this.handleEditMax = this.handleEditMax.bind(this);
    this.handlePreviewMax = this.handlePreviewMax.bind(this);
  }

  handleEditMax(){
    this.setState({
      editorMax: !this.state.editorMax
    })
  }

  handlePreviewMax(){
    this.setState({
      previewMax: !this.state.previewMax
    })
  }

  updateText(event) {
    this.props.onChangeText(event.target.value);
  }

  render() {
    const classes = 
      this.state.editorMax ?
      ['editor-wrap maximized', 'preview-wrap hide', 'bi bi-fullscreen-exit'] :
      this.state.previewMax ?
      ['editor-wrap hide', 'preview-wrap maximized', 'bi bi-fullscreen-exit'] :
      ['editor-wrap', 'preview-wrap', 'bi bi-arrows-fullscreen'];
    return (
      <div className='container'>
        <div className={classes[0]}>
          <Toolbar
            icon={classes[2]}
            onClick={this.handleEditMax}
            text="Editor"
          />
          <Editor
            markdown={this.props.text}
            onChange={this.updateText}
          />
        </div>

        <div className={classes[1]}>
          <Toolbar
            icon={classes[2]}
            onClick={this.handlePreviewMax}
            text="Preview"
          />
          <Preview
            markdown={this.props.text}
          />
        </div>
      </div>
    )
  }
}

const Toolbar = (props) => {
  return (
    <div className="toolbar">
      <span className="toolbar-header-text">{props.text}</span>
      <i className={props.icon} onClick={props.onClick}></i>
    </div>
  );
}

class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <textarea
        id="editor"
        onChange={this.props.onChange}
        value={this.props.markdown}
      />
    );
  }
}

class Preview extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div 
        id="preview" 
        dangerouslySetInnerHTML={{ __html: marked.parse(this.props.markdown)}}>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    text: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeText: (text) => {
      dispatch(changeText(text));
    },
  };
};

const Container = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App)

class AppWrapper extends React.Component {
  render() {
    return (
      <ReactRedux.Provider store={store}>
        <Container />
      </ReactRedux.Provider>
    );
  }
}

ReactDOM.render(<AppWrapper />, document.getElementById("root"));