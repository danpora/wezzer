import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Menu from './components/Menu';

import * as Utils from './utils';

import './style.css';

const styles = {
  root: {
    fontFamily: 'Roboto'
  }
}
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      defaultWeather: {},
      reports: {},
      myLocation: {
        lat: 0,
        lon: 0,
      },
    };
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
      },
      // user denied position
      (error) => {
        // TODO:: alert to user that he'll have to pick location alone
      },
    );
  }

  render() {
    // return <span className="wrapper">{ parseInt(Utils.distance(state.myLocation.lat, state.myLocation.lon, 40.78788, -74.014313)) } meters from new york</span>;
    return (
      <div style={styles.root}>
        <Header />
        <SearchBar />
        <Menu/>
        <span>{JSON.stringify(this.state.reports)}</span>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
