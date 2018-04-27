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
          <div className='draggableBar' />
          
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
          <div className='draggableBar' />
        </article>
      </React.Fragment>
    );
  }
}

export default App;
