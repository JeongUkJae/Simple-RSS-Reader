import React, { Component } from "react";
import { ipcRenderer } from "electron";

import "./App.css";
import Feeder from "./components/Feeder";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feeders: [],
      feedIndex: 0
    };

    ipcRenderer.on("ask-register-protocol", (event, args) => {
      let result = window.confirm(
        "Do you want to register `Simple RSS Reader` as default RSS feed protocol client?"
      );
      if (result) {
        ipcRenderer.send("register-protocol");
      }
    });

    ipcRenderer.on("ask-add-new-feed", (event, args) => {
      let result = window.confirm(
        `Do you want to add new Rss feeder on url ${args.url}?`
      );
      if (result) {
        ipcRenderer.send("add-new-feeder", { url: args.url });
      }
    });

    ipcRenderer.on("read-feeders", (event, args) => {
      this.setState({
        feeders: args.feeders
      });
    });
  }

  componentDidMount() {
    ipcRenderer.send("on-ready");
  }

  render() {
    let { feeders, feedIndex } = this.state;
    return (
      <React.Fragment>
        <aside className="feeders">
          <div className="draggableBar h40 fixed" />
          <div className="feeders-contents">
            {feeders.map((value, index) => (
              <Feeder
                key={index}
                image={value.image}
                active={true}
                onClick={() => this.setState({ feedIndex: index })}
              />
            ))}
          </div>
        </aside>
        <article className="news">
          <div className="draggableBar news-title">
            { feeders[feedIndex] ? (
              <React.Fragment>
                <h1>
                  {feeders[feedIndex].title}
                  <a className="link" href={feeders[feedIndex].link} target='_black'>
                    {feeders[feedIndex].link}
                  </a>
                </h1>
                <p>{feeders[feedIndex].description}</p>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h1> </h1>
                <p />
              </React.Fragment>
            )}
          </div>
        </article>
      </React.Fragment>
    );
  }
}

export default App;
