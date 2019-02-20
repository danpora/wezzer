import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Forecast from './components/Forecast';

import Tab from '@material-ui/core/Tab';

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
      value: 0,
      defaultWeather: {},
      reports: {},
      myLocation: {
        lat: 0,
        lon: 0,
      },
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value) {
    this.setState({ value });
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
        });

        fetch(
          `https://0brc1jr0z3.execute-api.eu-west-1.amazonaws.com/v1/weather?lon=${longitude}&lat=${latitude}`,
        )
          .then((r) => r.json())
          .then((r) => {
            this.setState({ reports: r });
          });

        fetch(
          `https://0brc1jr0z3.execute-api.eu-west-1.amazonaws.com/v1/weather/default?lon=${longitude}&lat=${latitude}`,
        )
          .then((r) => r.json())
          .then((r) => {
            this.setState({ defaultWeather: r });
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
    const { value } = this.state;

    return (
      <div style={styles.root}>
      <section>
        <Header />
        <SearchBar />
        {value === 0 && <Forecast data={this.state.defaultWeather} />}
        {value === 2 && <span>{JSON.stringify(this.state.reports)}</span>}
        {value === 1 && <div>Page Two</div>}
      </section>
      <section>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
        >
          <BottomNavigationAction label="Forecast" icon={<CloudIcon />} />
          <BottomNavigationAction label="Reports" icon={<UsersIcon />} />
          <BottomNavigationAction label="Map" icon={<MapIcon />} />
        </BottomNavigation>
      </section>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
