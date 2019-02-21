import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Forecast from './components/Forecast';
import Reports from './components/Reports';

import Fab from '@material-ui/core/Fab';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CloudIcon from '@material-ui/icons/Cloud';
import UsersIcon from '@material-ui/icons/SupervisedUserCircle';
import MapIcon from '@material-ui/icons/Map';
import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faCloud,
  faSun,
  faCloudRain,
  faCloudShowersHeavy,
  faCloudSun,
  faMeteor,
} from '@fortawesome/free-solid-svg-icons';

library.add(faCloud);
library.add(faSun);
library.add(faCloudRain);
library.add(faCloudShowersHeavy);
library.add(faCloudSun);
library.add(faMeteor);

import * as Utils from './utils';

import './style.css';

const styles = {
  root: {
    height: '100%',
    fontFamily: "'Rajdhani', 'sans-serif'",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
};

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tabValue: 0,
      defaultWeather: {
        data: [],
        statusMsg: '',
        statusType: 'REQUEST',
      },
      reports: {
        data: [],
        statusMsg: '',
        statusType: 'REQUEST',
      },
      myLocation: {
        lat: 0,
        lon: 0,
      },
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value) {
    this.setState({ tabValue: value });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      // user allowed position
      (currentPos) => {
        const { latitude, longitude } = currentPos.coords;

        this.setState({
          myLocation: {
            lat: latitude,
            lon: longitude,
          },
          defaultWeather: {
            ...this.state.defaultWeather,
            statusMsg: 'Fetching forecast..',
            statusType: 'REQUEST',
          },
          reports: {
            ...this.state.reports,
            statusMsg: 'Fetching user reports..',
            statusType: 'REQUEST',
          },
        });

        fetch(
          `https://0brc1jr0z3.execute-api.eu-west-1.amazonaws.com/v1/weather?lon=${longitude}&lat=${latitude}`,
        )
          .then((r) => r.json())
          .then((data) => {
            this.setState({
              reports: {
                statusMsg: 'Successfully loaded forecast',
                statusType: 'SUCCESS',
                data,
              },
            });
          });

        fetch(
          `https://0brc1jr0z3.execute-api.eu-west-1.amazonaws.com/v1/weather/default?lon=${longitude}&lat=${latitude}`,
        )
          .then((r) => r.json())
          .then((data) => {
            this.setState({
              defaultWeather: {
                statusMsg: 'Successfully loaded user reports',
                statusType: 'SUCCESS',
                data,
              },
            });
          });
      },
      // user denied position
      (error) => {
        // TODO:: alert to user that he'll have to pick location alone
      },
    );
  }

  render() {
    const { classes } = this.props;
    const { tabValue } = this.state;

    const isLoadingDefaultWeather =
      this.state.defaultWeather.statusType === 'REQUEST';

    const isLoadingReports = this.state.reports.statusType === 'REQUEST';

    return (
      <div style={styles.root}>
        <section>
          <Header />
          <SearchBar />
          {tabValue === 0 && (
            <ForecastWithLoader
              isLoading={isLoadingDefaultWeather}
              data={this.state.defaultWeather.data}
            />
          )}
          {tabValue === 1 && (
            <ReportsWithLoader
              isLoading={isLoadingReports}
              data={this.state.reports.data}
            />
          )}
          {tabValue === 2 && <div>Page under construction!</div>}
        </section>
        <section style={{ display: 'flex', flexDirection: 'column' }}>
          <Fab
            style={{
              backgroundColor: '#6abfea',
              color: 'white',
              float: 'right',
              width: '122px',
              alignSelf: 'flex-end',
              margin: '0 10px 10px 0'
            }}
            variant="extended"
            aria-label="Add"
          >
            <CloudUploadIcon style={{ marginRight: '5px' }} />
            Report
          </Fab>
          <BottomNavigation
            value={tabValue}
            onChange={this.handleChange}
            showLabels
          >
            <BottomNavigationAction style={{ color: 'grey'}} label="Forecast" icon={<CloudIcon />} />
            <BottomNavigationAction style={{ color: 'grey'}} label="Reports" icon={<UsersIcon />} />
            <BottomNavigationAction style={{ color: 'grey'}} label="Map" icon={<MapIcon />} disabled />
          </BottomNavigation>
        </section>
      </div>
    );
  }
}

const withLoader = (Component) => (props) => {
  return props.isLoading ? 'Loading..' : <Component {...props} />;
};

const ForecastWithLoader = withLoader(Forecast);
const ReportsWithLoader = withLoader(Reports);

ReactDOM.render(<App />, document.getElementById('app'));
