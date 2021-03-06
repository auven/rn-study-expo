import React from 'react'
import { Text, View } from 'react-native'
import SyntaxHighlighter from 'react-native-syntax-highlighter' // 2.0.0
import { tomorrow } from 'react-syntax-highlighter/styles/prism' // 7.0.1

const code = `import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import copy from'copy-to-clipboard';
import atomOneDark from 'react-syntax-highlighter/dist/styles/atom-one-dark';

const headerStyle = width => ({
  boxSizing: 'border-box',
  color: 'rgb(69, 45, 45)',
  backgroundColor: 'rgb(225, 223, 225)',
  fontFamily: 'monaco, Consolas, Lucida Console, monospace',
  fontSize: 16,
  paddingBottom: 1,
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
  width,
  display: 'flex',
  justifyContent: 'space-between'
});

const buttonsContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  width: 60,
  paddingTop: 5,
  paddingLeft: 20,
  textAlign: 'center'
};

const buttonStyle = color => ({
  width: 14,
  height: 14,
  borderRadius: '50%',
  backgroundColor: color
});

const copyStyle = hovered => ({
  marginRight: 12,
  paddingLeft: 8,
  paddingRight: 8,
  cursor: 'pointer',
  color: hovered ? '#2C1414' : 'rgb(69, 45, 45)'
});

const redButton = buttonStyle('rgb(252, 100, 95)');
const yellowButton = buttonStyle('rgb(253, 191, 65)');
const greenButton = buttonStyle('rgb(54, 206, 76)');

export default class CodeWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { minimized: props.minimized || false, showMinus: false, copyHovered: false };
  }

  onMinimize = () => {
    if (this.props.onMinimize) {
      this.props.onMinimize();
    } else if (this.props.minimized === undefined) {
      this.setState({ minimized: true });
    }
  }

  onMaximize = () => {
    if (this.props.onMaximize) {
      this.props.onMaximize();
    } else if (this.props.minimized === undefined) {
      this.setState({ minimized: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.minimized !== undefined && (nextProps.minimized !== this.state.minimized)) {
      this.setState({ minimized: nextProps.minimized });
    }
  }

  render() {
    const {
      width = 500,
      title ='react-code-window',
      children,
      CopyComponent
    } = this.props;
    const yellowButtonChildren = (
      this.state.showMinus && this.props.allowMinimizeMaximize
      ?
      <span style={{
        position:
        'relative',
        bottom: '5px',
        fontWeight: 600,
        fontSize: 14,
        color: 'rgba(0,0,0,0.5)',
        cursor: 'default',
        highlight: 'none'
      }}>&minus;</span>
      :
      null
    );
    const greenButtonChildren = (
      this.state.showMinus && this.props.allowMinimizeMaximize
      ?
      <span style={{
        position:
        'relative',
        bottom: '5px',
        fontWeight: 600,
        fontSize: 12,
        color: 'rgba(0,0,0,0.5)',
        cursor: 'default',
        highlight: 'none'
      }}>&#43;</span>
      :
      null
    );
    const syntax = (
      !this.state.minimized
      ?
      <SyntaxHighlighter
        style={atomOneDark}
        customStyle={{
          margin: 0,
        }}
      >
        {children}
      </SyntaxHighlighter>
      :
      null
    );
    const copyButton = (
      this.props.showCopy
      ?
      <CopyComponent
        style={
          typeof this.props.copyComponentStyle === 'function'
          ?
          this.props.copyComponentStyle(this.state.copyHovered)
          :
          this.props.copyComponentStyle
        }
        onMouseEnter={() => this.setState({ copyHovered: true })}
        onMouseLeave={() => this.setState({ copyHovered: false })}
        onClick={() => copy(children)}
      >
        {this.props.copyChildren}
      </CopyComponent>
      :
      <span />
    );
    return (
      <div style={{position: 'relative', width: '100%'}}>
        <div style={headerStyle(width)}>
          <span
            style={buttonsContainer}
            onMouseEnter={() => this.setState({ showMinus: true })}
            onMouseLeave={() => this.setState({ showMinus: false })}
          >
            <div style={redButton} />
            <div
              style={yellowButton}
              onClick={() => this.props.allowMinimizeMaximize && this.onMinimize()}
            >
              {yellowButtonChildren}
            </div>
            <div
              style={greenButton}
              onClick={() => this.props.allowMinimizeMaximize && this.onMaximize()}
            >
              {greenButtonChildren}
            </div>
          </span>
          <span>{title}</span>
          {copyButton}
        </div>
        {syntax}
      </div>
    );
  }
}

CodeWindow.defaultProps = {
  allowMinimizeMaximize: true,
  showCopy: true,
  CopyComponent: 'div',
  copyComponentStyle: copyStyle,
  copyChildren: 'Copy'
};
`

export default class App extends React.Component {
  static navigationOptions = {
    title: 'react-native-syntax-highlighter'
  }

  constructor(props) {
    super(props)
    this.state = { code: '' }
    this.didBlurSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        console.log('didFocus', payload)
        this.setState({
          code
        })
      }
    )
  }
  render() {
    return (
      <View style={{ backgroundColor: '#E87A90', height: '100%' }}>
        <Text
          style={{
            marginTop: 30,
            marginBottom: 30,
            textAlign: 'center',
            fontSize: 22,
            fontWeight: '900'
          }}
        >
          React Native Syntax Higlighter
        </Text>
        <SyntaxHighlighter
          {...this.props}
          style={tomorrow}
          customStyle={{ padding: 0, margin: 0 }}
          language="javascript"
          fontSize={18}
          highlighter="prism"
        >
          {this.state.code}
        </SyntaxHighlighter>
      </View>
    )
  }
}
