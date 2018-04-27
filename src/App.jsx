import React, { Component } from "react";
import { ipcRenderer } from "electron";

import "./App.css";
import Feeder from "./components/Feeder";

class App extends Component {
  constructor(props) {
    super(props);

    ipcRenderer.on("ask-register-protocol", (event, args) => {
      let result = window.confirm('Do you want to register Simple RSS Reader as default RSS feed protocol client?')
    });
  }

  componentDidMount() {
    ipcRenderer.send("on-ready");
  }

  render() {
    return (
      <React.Fragment>
        <aside className="feeders">
          <div className="draggableBar h40 fixed" />
          <div className="feeders-contents">
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
        <article className="news">
          <div className="draggableBar news-title">
            <h1>
              Title <a className="link">https://link</a>
            </h1>
            <p>Description</p>
          </div>
        </article>
      </React.Fragment>
    );
  }
}

export default App;
