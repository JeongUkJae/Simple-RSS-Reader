import React, { Component } from "react";
import PropTypes from "prop-types";

import "./News.css";

class News extends Component {
  render() {
    return (
      <div className="news-item" onClick={this.handleClick}>
        <h3 className="news-item-title">{this.props.item.title}</h3>
        <p className="news-item-description">{this.props.item.description}</p>
        <p className="news-item-extra-info">
          <span>{this.props.item.pubDate}</span>
          <span>{this.props.item.author}</span>
        </p>
      </div>
    );
  }

  handleClick = () => {
    window.open(this.props.item.link, "_blank");
  };
}

News.propTypes = {
  item: PropTypes.object.isRequired
};

export default News;
