import React, { Component } from 'react';
import axios from 'axios';
import { Button } from '@rmwc/button';
import { Select } from '@rmwc/select';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      textToTranslate: '',
      sourceLang: '',
      targetLang: '',
      languages: [],
    };
  }

  componentDidMount() {
    axios
      .get('/api')
      .then(res => this.setState({ languages: res.data.languages }));
  }

  onTranslate = (sourceLang, targetLang, content) => {
    axios
      .post('/api/translate', {
        text: content,
        source: sourceLang,
        target: targetLang,
      })
      .then(res => this.setState({ result: res.data }))
      .catch(err => console.log(err));
  };

  handleInput = (key, val) => {
    this.setState({ [key]: val });
  };

  reset = () => {
    this.setState({
      result: '',
      textToTranslate: '',
      sourceLang: '',
      targetLang: '',
    });
  };

  render() {
    const {
      result,
      textToTranslate,
      sourceLang,
      targetLang,
      languages,
    } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Translate</h1>
        </header>
        <main>
          {languages.length > 0 && (
            <section className="grid">
              <div>
                <Select
                  value={sourceLang}
                  label="Source Language"
                  placeholder=""
                  onChange={evt =>
                    this.handleInput('sourceLang', evt.target.value)
                  }
                  options={languages.map(lang => ({
                    label: lang.name,
                    value: lang.language,
                  }))}
                />
                <TextField
                  textarea
                  fullwidth
                  label="enter text to translate"
                  value={textToTranslate}
                  style={{ marginTop: '1rem' }}
                  onChange={evt =>
                    this.handleInput('textToTranslate', evt.target.value)
                  }
                />
              </div>
              <div>
                <Select
                  value={targetLang}
                  label="Target Language"
                  placeholder=""
                  onChange={evt =>
                    this.handleInput('targetLang', evt.target.value)
                  }
                  options={languages.map(lang => ({
                    label: lang.name,
                    value: lang.language,
                  }))}
                />
                <div className="result-box">
                  <Typography>{result}</Typography>
                </div>
              </div>
              <Button
                raised
                onClick={() =>
                  result.length > 0
                    ? this.reset()
                    : this.onTranslate(sourceLang, targetLang, textToTranslate)
                }
              >
                {result.length > 0 ? 'reset' : 'translate'}
              </Button>
            </section>
          )}
        </main>
      </div>
    );
  }
}

export default App;
