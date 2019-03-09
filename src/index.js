import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Forecast from './components/Forecast';
import Reports from './components/Reports';
import Loading from './components/Loading';
import ReportDialog from './components/ReportDialog';
import AutoComplete from './components/AutoComplete';

import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BottomNavigation from '@material-ui/core/BottomNavigation';

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
  faCloudSunRain,
  faCloudMeatball,
  faCloudMoonRain,
  faCloudMoon,
  faMoon,
  faRainbow,
  faSmog,
  faWind,
  faBolt
} from '@fortawesome/free-solid-svg-icons';

library.add(faCloud);
library.add(faSun);
library.add(faCloudRain);
library.add(faCloudShowersHeavy);
library.add(faCloudSun);
library.add(faMeteor);
library.add(faCloudSunRain);
library.add(faCloudMeatball);
library.add(faCloudMoonRain);
library.add(faCloudMoon);
library.add(faMoon);
library.add(faRainbow);
library.add(faSmog);
library.add(faWind);
library.add(faBolt);


import * as Utils from './utils';

import './style.css';
import { withStyles } from '@material-ui/core';

const styles = {
  root: {
    height: '100%',
    fontFamily: "'Rajdhani', 'sans-serif'",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '@media (min-width: 768px)': {
      width: '60%',
      margin: 'auto',
      padding: '100px 0'
    }
  },
  content: {
    padding: '15px 0',
    textAlign: 'center',
    '@media (min-width: 768px)': {
      padding: '50px 0'
    }
  },
  searchBar: {
    padding: '13px 30px',
    '@media (min-width: 768px)': {
      padding: '40px 0'
    }
  }
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
      selectedCity: {},
      reportButtonLabel: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.getReports = this.getReports.bind(this);
    this.reportWeather = this.reportWeather.bind(this);
    this.handleCitySelection = this.handleCitySelection.bind(this);
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

  handleCitySelection (city) {
    const { lon, lat } = city.location;

    this.setState({ selectedCity: city});

    fetch(
      `https://0brc1jr0z3.execute-api.eu-west-1.amazonaws.com/v1/weather/default?lon=${lon}&lat=${lat}`,
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

    this.getReports(lon, lat);
  }

  getReports(event, lon, lat) {
    this.setState({
      reports: {
        statusMsg: 'Fetching user reports..',
        statusType: 'REQUEST',
        data: [],
      },
    });

    const targetLon = lon || this.state.myLocation.lon;
    const targetLat = lat || this.state.myLocation.lat;

    fetch(
      `https://0brc1jr0z3.execute-api.eu-west-1.amazonaws.com/v1/weather?lon=${targetLon}&lat=${targetLat}`,
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
  }

  reportWeather (weatherCode) {
    this.setState({ reportButtonLabel: 'Reporting weather..'});

    fetch(
      `https://0brc1jr0z3.execute-api.eu-west-1.amazonaws.com/v1/weather`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lon: this.state.myLocation.lon,
          lat: this.state.myLocation.lat,
          data: {
            code: weatherCode
          }
        })
      }
    )
      .then((r) => r.json())
      .then((data) => {
          setTimeout(() => {

            this.setState({ reportButtonLabel: 'Weather reported!' });
            
            setTimeout(() => {
              this.setState({ reportButtonLabel: '' });
            }, 4000);

          }, 3000);
      });
  }

  render() {
    const { classes } = this.props;
    const { tabValue } = this.state;

    const isLoadingDefaultWeather =
      this.state.defaultWeather.statusType === 'REQUEST';

    const isLoadingReports = this.state.reports.statusType === 'REQUEST';
    
    return (
      <div className={classes.root}>
        <section>
          <Header />
          {/* <SearchBar /> */}
          <AutoComplete 
            className={classes.searchBar}
            handleSelection={this.handleCitySelection}
          />
          {tabValue === 0 && (
            <ForecastWithLoader
              className={classes.content}
              isLoading={isLoadingDefaultWeather}
              data={this.state.defaultWeather.data}
            />
          )}
          {tabValue === 1 && (
            <ReportsWithLoader
              className={classes.content}
              isLoading={isLoadingReports}
              data={this.state.reports.data}
            />
          )}
          {tabValue === 2 && <div>Page under construction!</div>}
        </section>
        <section style={{ display: 'flex', flexDirection: 'column' }}>
          <ReportDialog
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '30px'
            }}
            reportWeather={this.reportWeather}
            buttonLabel={this.state.reportButtonLabel}
          />
          <BottomNavigation
            value={tabValue}
            onChange={this.handleChange}
            showLabels
          >
            <BottomNavigationAction
              style={{ color: 'grey' }}
              label="Forecast"
              icon={<CloudIcon />}
            />
            <BottomNavigationAction
              style={{ color: 'grey' }}
              label="Reports"
              icon={<UsersIcon />}
              onClick={this.getReports}
            />
            <BottomNavigationAction
              style={{ color: 'grey' }}
              label="Map"
              icon={<MapIcon />}
              disabled
            />
          </BottomNavigation>
        </section>
      </div>
    );
  }
}

const withLoader = (Component) => (props) => {  
  return props.isLoading ? <Loading {...props} /> : <Component {...props} />;
};

const ForecastWithLoader = withLoader(Forecast);
const ReportsWithLoader = withLoader(Reports);

const StyledApp = withStyles(styles)(App);

ReactDOM.render(<StyledApp />, document.getElementById('app'));
