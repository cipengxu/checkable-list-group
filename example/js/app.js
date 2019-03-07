import React, { Component } from 'react';
import { render } from 'react-dom';
import { Usage1, Usage2 } from './usage';
import '../css/app.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <Usage1 />
        <Usage2 />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
