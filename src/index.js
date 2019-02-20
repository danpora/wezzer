import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Forecast from './components/Forecast';
import Menu from './components/Menu';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

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
    fontFamily: "'Rajdhani', 'sans-serif'"
  }
};

function LinkTab(props) {
  return (
    <Tab component="a" onClick={(event) => event.preventDefault()} {...props} />
  );
}

const tabStyles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});
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
    // return <span className="wrapper">{ parseInt(Utils.distance(state.myLocation.lat, state.myLocation.lon, 40.78788, -74.014313)) } meters from new york</span>;
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div style={styles.root}>
        <Header />
        <SearchBar />
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs
              variant="fullWidth"
              value={value}
              onChange={this.handleChange}
              style={{ backgroundColor: '#6abfea' }}
            >
              <LinkTab label="Forecast" />
              <LinkTab label="Social" />
              <LinkTab label="Map" />
            </Tabs>
          </AppBar>
          {value === 0 && (
              <Forecast data={this.state.defaultWeather} />
          )}
          {value === 2 && (
              <span>{JSON.stringify(this.state.reports)}</span>
          )}
          {value === 1 && <div>Page Two</div>}
        </div>
      </div>
    );
  }
}

const AppWrapper = withStyles(tabStyles)(App);

ReactDOM.render(<AppWrapper />, document.getElementById('app'));
