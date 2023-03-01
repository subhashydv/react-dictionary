import React from "react";
import "../css/input.css";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputText: this.props.word };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(event) {
    const inputText = event.target.value;
    this.setState((state) => ({
      inputText,
    }));
  }

  handleKeyDown(event) {
    const lastKey = event.key;
    if (lastKey === 'Enter') {
      this.props.onEnter(this.state.inputText);
      // this.setState(() => ({ inputText: '' }));
    }
  }

  render() {
    return (
      <div>
        <input value={this.state.inputText} onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
        <p className="reflector">You are searching for : {this.state.inputText}</p>

      </div >
    )
  }
}

export default Input;