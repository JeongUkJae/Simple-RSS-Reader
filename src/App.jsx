import React, { Component } from 'react';
import './App.css';
import Feeder from './components/Feeder';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <aside className='feeders'>
          <div className='draggableBar h40 fixed' />
          <div className='feeders-contents'>
            <Feeder />
            <Feeder />
            <Feeder />
            <Feeder />
            <Feeder />
            <Feeder />
            <Feeder />
            <Feeder />
            <Feeder />
            <Feeder />
          </div>
        </aside>
        <article className='news'>
          <div className='draggableBar news-title'>
            <h1>Title <a className='link'>https://link</a></h1>
            <p>Description</p>
          </div>
        </article>
      </React.Fragment>
    );
  }
}

export default App;
