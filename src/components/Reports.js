import React from 'react';
import * as Utils from '../utils';

import WeatherIcon from './WeatherIcon';

export default function Reports(props) {
  const { className } = props;

  const sortedReportsCounts = Utils.getDominantWeatherCodeFromReports(
    props.data,
  );
  const isNoReports = sortedReportsCounts.length === 0;

  return (
    <div className={className}>
      {isNoReports ? (
        'No reports Available'
      ) : (
        <ReportsViewer reportsCounts={sortedReportsCounts} />
      )}
    </div>
  );
}

function ReportsViewer (props) {
  const [weatherCode, weatherCodeVoters] = props.reportsCounts[0];

  return (
    <React.Fragment>
      <div style={{ padding: '15px 0' }}>
        <div style={{ textAlign: 'center' }}>
        <WeatherIcon code={weatherCode} />
        </div>
        <div style={{ textAlign: 'center', fontSize: '3em' }}>
          {Utils.weatherCodeToDescription[weatherCode]}
        </div>
        <div style={{ textAlign: 'center' }}>
          {`According to ${weatherCodeVoters} humans (10Km around you)`}
        </div>
      </div>
    </React.Fragment>
  );
}
