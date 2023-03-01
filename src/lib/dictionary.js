import React from "react";
import loadingImage from "../images/loading-gif.gif";
import "../css/dictionary.css"

const Loading = (_) => <div><img className="center" src={loadingImage}></img></div>;

class Dictionary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fetching: true, meaning: null, word: this.props.word };
    this.meanings = this.meanings.bind(this);
  }

  fetchMeaning(word) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((x) => x.json())
      .then(processOutput)
      .then((meanings) => this.setState(() =>
        ({ fetching: false, meaning: meanings })))
  }

  setLoading() {
    this.setState((state) => ({ fetching: true }));
  }

  componentDidMount() {
    this.fetchMeaning(this.props.word);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.word !== this.props.word) {
      this.setLoading();
      this.fetchMeaning(this.props.word);
    }
  }

  meanings() {
    return this.state.meaning.map((x, index) => {
      const { definition, partOfSpeech } = x;
      return (<p className="meaning-block" key={index}><h3>{partOfSpeech} :</h3> <ol>{definition.map(a => <li className="list">{a}</li>)}</ol></p>);
    });
  }


  render() {
    return this.state.fetching ? <Loading /> : <div>{this.meanings()}</div>;
  }
}

const processOutput = (output) => {
  console.log(output);
  const { meanings } = output[0];
  return meanings.map(({ definitions, partOfSpeech }) => { return { definition: flatDefinition(definitions), partOfSpeech } });
}

const flatDefinition = (definitions) => {
  return definitions.reduce((context, definition) => {
    context.push(definition.definition);
    return context;
  }, [])
}

export default Dictionary;