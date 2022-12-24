import React from "react";

const Loading = (_) => <div>Loading...</div>;

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
      return (<p key={index}>{partOfSpeech} : {definition}</p>);
    });
  }


  render() {
    return this.state.fetching ? <Loading /> : <div>{this.meanings()}</div>;
  }
}

const processOutput = (output) => {
  console.log(output);
  const { meanings } = output[0];
  return meanings.map(({ definitions, partOfSpeech }) => { return { definition: definitions[0].definition, partOfSpeech } });
}

export default Dictionary;