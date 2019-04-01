import React from 'react';
import PropTypes from 'prop-types';

export default function Loading(props) {
  const { className } = props;

  return (
    <div className={className}>
      <div id="loader-wrapper">
        <div className="lds-ripple">
          <div />
          <div />
        </div>
        <span>Wezzer</span>
      </div>
    </div>
  );
}

Loading.propTypes = {
  className: PropTypes.string,
};
