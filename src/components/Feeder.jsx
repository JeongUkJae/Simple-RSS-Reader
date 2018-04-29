import React, { Component } from "react";

import PropTypes from 'prop-types';

import "./Feeder.css";

class Feeder extends Component {
  render() {
    let { title, image, active, onClick } = this.props;

    return (
      <div className={`feeder${active ? ' active' : ''}`} onClick={onClick}>
        <div>
          {
            image.title ? (
              <img alt={`"${image.title}"'s avatar`} src={image.url} />
            ) : (
              <div className='img-wrapper'>
                <div className='img'>{title.substr(0, 2)}</div>
              </div>
            )
          }
        </div>
        <span>{title}</span>
      </div>
    );
  }
}

Feeder.propTypes = {
  image: PropTypes.object.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string
}

export default Feeder;
