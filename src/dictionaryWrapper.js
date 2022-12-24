import React from "react";
import Dictionary from "./dictionary";
import Input from "./input";

class DictionaryWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { word: '' };
    this.getInputText = this.getInputText.bind(this);
  }

  getInputText(text) {
    this.setState((state) => ({ word: text }))
  }

  render() {
    const text = this.state.word;
    const input = <Input onEnter={this.getInputText} word={text} />;

    return this.state.word === '' ? <div>{input} <a href='https://api.dictionaryapi.dev/media/pronunciations/en/hello-uk.mp3'>hello</a></div> : < div > {input} < Dictionary word={text} /></div >
  }
}

export default DictionaryWrapper;