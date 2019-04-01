import React from 'react';
import ReactDOM from 'react-dom';

import * as ApiService from './services/api';

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
    height: '100%',
    textAlign: 'center',
    '@media (min-width: 768px)': {
      padding: '5px 0'
    }
  },
  searchBar: {
    padding: '13px 30px',
    '@media (min-width: 768px)': {
      padding: '40px 0',
      margin: 'auto',
      maxWidth: '500px'
    }
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
    marginBottom: '30px'
  },
  bottomNav: {
    background: 'transparent'
  }
  
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
      locationDetected: false
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
          locationDetected: true
        });

        ApiService.getUserReports(longitude, latitude)
          .then((data) => {
            this.setState({
              reports: {
                statusMsg: 'Successfully loaded forecast',
                statusType: 'SUCCESS',
                data,
              },
            });
          });

          ApiService.getDefaultWeather(longitude, latitude)
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
        this.setState({
          defaultWeather: {
            statusMsg: 'Unable to get location',
            statusType: 'WARN',
            data: {}
          }
        })
      },
    );
  }

  handleCitySelection (city) {
    const { lon, lat } = city.location;

    this.setState({ 
      selectedCity: city,
      defaultWeather: {
        data: {},
        statusMsg: '',
        statusType: 'REQUEST',
      }
    });

    ApiService.getDefaultWeather(lon, lat)
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

    const selectedCityLocation = this.state.selectedCity.location || {};
    const myLocation = this.state.myLocation;
    
    const targetLon = lon || selectedCityLocation.lon || myLocation.lon;
    const targetLat = lat || selectedCityLocation.lat || myLocation.lat;

    ApiService.getUserReports(targetLon, targetLat)
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
    
    const { lon, lat } = this.state.myLocation;

    ApiService.setUserReport(lon, lat, weatherCode)
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
        </section>
        <section className={classes.flexColumn}>
          <ReportDialog
            className={classes.reportDialog}
            reportWeather={this.reportWeather}
            buttonLabel={this.state.reportButtonLabel}
            isLocationAvailable={this.state.locationDetected}
          />
          <BottomNavigation
            className={classes.bottomNav}
            value={tabValue}
            onChange={this.handleChange}
            showLabels
          >
            <BottomNavigationAction
              className={classes.navigationButton}
              label="Forecast"
              icon={<CloudIcon />}
            />
            <BottomNavigationAction
              className={classes.navigationButton}
              label="Reports"
              icon={<UsersIcon />}
              onClick={this.getReports}
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
