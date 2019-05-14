import React from 'react';
import ReactDOM from 'react-dom';

import * as ApiService from './services/api';

import Header from './components/Header';
import Forecast from './components/Forecast';
import Reports from './components/Reports';
import Loading from './components/Loading';
import ReportDialog from './components/ReportDialog';
import AutoComplete from './components/AutoComplete';

import Tooltip from '@material-ui/core/Tooltip';
import GpsFixed from '@material-ui/icons/GpsFixed';

import './style.css';
import { withStyles } from '@material-ui/core';

export const ThemeContext = React.createContext(true);

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
      padding: '100px 0',
    },
  },
  content: {
    padding: '15px 0',
    height: '100%',
    textAlign: 'center',
    '@media (min-width: 768px)': {
      padding: '5px 0',
    },
  },
  searchBar: {
    padding: '13px 30px',
    '@media (min-width: 768px)': {
      padding: '40px 0',
      margin: 'auto',
      maxWidth: '500px',
    },
  },
  locationButton: {
    float: 'right',
    margin: '8px 0',
    color: 'grey',
    fontSize: '2em',
    transition: 'font-size 2s',
    '&:hover': {
      cursor: 'pointer',
      fontSize: '2.5em',
      color: '#6abfea'
    },
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  navigationButton: {
    color: 'grey',
  },
  reportDialog: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px',
  },
  bottomNav: {
    display: 'flex',
    justifyContent: 'center',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  li: {
    float: 'left',
    padding: '0 20px',
  },
};

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tabValue: 0,
      defaultWeather: {
        data: {},
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
      locationDetected: false,
      isDarkTheme: false,
    };

    this.handleTabChange = this.handleTabChange.bind(this);
    this.getReports = this.getReports.bind(this);
    this.reportWeather = this.reportWeather.bind(this);
    this.handleCitySelection = this.handleCitySelection.bind(this);
    this.handleLocationButton = this.handleLocationButton.bind(this);
    this.handleThemeToggle = this.handleThemeToggle.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem('dark')) {
      document.body.classList.add('dark');
      this.setState({ isDarkTheme: true });
    }
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
          locationDetected: true,
        });

        ApiService.getUserReports(longitude, latitude).then((data) => {
          this.setState({
            reports: {
              statusMsg: 'Successfully loaded forecast',
              statusType: 'SUCCESS',
              data,
            },
          });
        });

        ApiService.getDefaultWeather(longitude, latitude).then((data) => {
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
        this.setState({
          defaultWeather: {
            statusMsg: 'Unable to get location',
            statusType: 'WARN',
            data: {},
          },
        });
      },
    );
  }

  handleTabChange(value) {
    this.setState({ tabValue: value });
  }

  handleCitySelection(city) {
    const { lon, lat } = city.location;

    this.setState({
      selectedCity: city,
      defaultWeather: {
        data: {},
        statusMsg: '',
        statusType: 'REQUEST',
      },
    });

    ApiService.getDefaultWeather(lon, lat).then((data) => {
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

    const selectedCityLocation = this.state.selectedCity.location || {};
    const myLocation = this.state.myLocation;

    const targetLon = lon || selectedCityLocation.lon || myLocation.lon;
    const targetLat = lat || selectedCityLocation.lat || myLocation.lat;

    ApiService.getUserReports(targetLon, targetLat).then((data) => {
      this.setState({
        reports: {
          statusMsg: 'Successfully loaded forecast',
          statusType: 'SUCCESS',
          data,
        },
      });
    });
  }

  reportWeather(weatherCode) {
    this.setState({ reportButtonLabel: 'Reporting weather..' });

    const { lon, lat } = this.state.myLocation;

    ApiService.setUserReport(lon, lat, weatherCode).then((data) => {
      setTimeout(() => {
        this.setState({ reportButtonLabel: 'Weather reported!' });

        setTimeout(() => {
          this.setState({ reportButtonLabel: '' });
        }, 4000);
      }, 3000);
    });
  }

  handleLocationButton() {
    const { lat, lon } = this.state.myLocation;

    // no location permission allowed yet
    if (lon && lat) {
      ApiService.getUserReports(lon, lat).then((data) => {
        this.setState({
          reports: {
            statusMsg: 'Successfully loaded forecast',
            statusType: 'SUCCESS',
            data,
          },
        });
      });

      ApiService.getDefaultWeather(lon, lat).then((data) => {
        this.setState({
          defaultWeather: {
            statusMsg: 'Successfully loaded user reports',
            statusType: 'SUCCESS',
            data,
          },
        });
      });
    }
  }

  handleThemeToggle() {
    const isDarkActive = document.body.classList.contains('dark');
    if (isDarkActive) {
      document.body.classList.remove('dark');
      localStorage.removeItem('dark');
    } else {
      document.body.classList.add('dark');
      localStorage.setItem('dark', true);
    }

    // toggle dark mode
    this.setState({ isDarkTheme: !isDarkActive });
  }

  render() {
    const { classes } = this.props;
    const { tabValue } = this.state;

    const isLoadingDefaultWeather =
      this.state.defaultWeather.statusType === 'REQUEST';

    const isLoadingReports = this.state.reports.statusType === 'REQUEST';
    const themeStyle = { color: this.state.isDarkTheme ? 'white' : 'black' };

    return (
      <div className={classes.root}>
        <ThemeContext.Provider value={this.state.isDarkTheme}>
          <section>
            <Header
              isDarkTheme={this.state.isDarkTheme}
              handleThemeToggle={this.handleThemeToggle}
            />
            <SearchSection
              classes={classes}
              handleCitySelection={this.handleCitySelection}
              onCurrentLocationClick={this.handleLocationButton}
            />
            <WeatherContent
              classes={classes}
              data={this.state}
              isLoadingDefaultWeather={isLoadingDefaultWeather}
              isLoadingReports={isLoadingReports}
              tabValue={tabValue}
            />
          </section>
          <section className={classes.flexColumn}>
            <ReportDialog
              className={classes.reportDialog}
              reportWeather={this.reportWeather}
              buttonLabel={this.state.reportButtonLabel}
              isLocationAvailable={this.state.locationDetected}
            />
            <div>
              <ul className={classes.bottomNav}>
                <li className={classes.li}>
                  <a
                    href=""
                    style={themeStyle}
                    onClick={(e) => {
                      e.preventDefault();
                      this.handleTabChange(0);
                    }}
                  >
                    Forecast
                  </a>
                </li>
                <li className={classes.li}>{' | '} </li>
                <li className={classes.li}>
                  <a
                    href=""
                    style={themeStyle}
                    onClick={(e) => {
                      e.preventDefault();
                      this.handleTabChange(1);
                      this.getReports();
                    }}
                  >
                    Reports{' '}
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </ThemeContext.Provider>
      </div>
    );
  }
}

function WeatherContent(props) {
  return (
    <>
      {props.tabValue === 0 && (
        <ForecastWithLoader
          className={props.classes.content}
          isLoading={props.isLoadingDefaultWeather}
          data={props.data.defaultWeather.data}
        />
      )}
      {props.tabValue === 1 && (
        <ReportsWithLoader
          className={props.classes.content}
          isLoading={props.isLoadingReports}
          data={props.data.reports.data}
        />
      )}
    </>
  );
}

function SearchSection(props) {
  return (
    <div className={props.classes.searchBar}>
      <AutoComplete handleSelection={props.handleCitySelection} />
      <Tooltip
        placement="left"
        title={'Show weather in your location'}
      >
        <GpsFixed
          className={props.classes.locationButton}
          onClick={props.onCurrentLocationClick}
        />
      </Tooltip>
    </div>
  );
}

const withLoader = (Component) => (props) => {
  return props.isLoading ? <Loading {...props} /> : <Component {...props} />;
};

const ForecastWithLoader = withLoader(Forecast);
const ReportsWithLoader = withLoader(Reports);

const StyledApp = withStyles(styles)(App);

ReactDOM.render(<StyledApp />, document.getElementById('app'));
