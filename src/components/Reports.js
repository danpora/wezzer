import React from 'react';
import * as Utils from '../utils';

export default function Reports (props) {
  return (
    <div>{JSON.stringify(Utils.getDominantWeatherCodeFromReports(props.data))}</div>
  );
}