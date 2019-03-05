import React from 'react';
import PropTypes from 'prop-types';

export default function Loading (props) {
  const { className } = props;

  return (
    <div className={className}>Loading..</div>
  );
}

Loading.propTypes = {
  className: PropTypes.string
}