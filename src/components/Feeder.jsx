import React, { Component } from "react";

import PropTypes from 'prop-types';

import "./Feeder.css";

class Feeder extends Component {
  render() {
    let { image, active, onClick } = this.props;

    return (
      <div className={`feeder${active ? ' active' : ''}`} onClick={onClick}>
        <div>
          <img alt={`"${image.title}"'s avatar`} src={image.url} />
        </div>
        <span>{image.title}</span>
      </div>
    );
  }
}

Feeder.propTypes = {
  image: PropTypes.object.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func
}

export default Feeder;
