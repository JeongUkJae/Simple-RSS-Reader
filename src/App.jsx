import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <aside className='feeders'>
          <div className='draggableBar' />

        </aside>
        <article className='news'>
          <div className='draggableBar' />
        </article>
      </React.Fragment>
    );
  }
}

export default App;
