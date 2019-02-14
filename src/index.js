import { h, render, Component } from 'preact';
import * as Utils from './utils';

import './style.css';
class App extends Component {
    constructor () {
        super();

        this.state = {
            defaultWeather: {},
            reports: {},
            myLocation: {
                lat: 0,
                lon: 0
            }
        }
    }

    componentDidMount () {
        navigator.geolocation.getCurrentPosition(
            // user allowed position
            (currentPos) => {
                this.setState({
                    myLocation: {
                        lat: currentPos.coords.latitude,
                        lon: currentPos.coords.longitude,
                    }
                })
            }, 
            // user denied position
            (error) => {
                // TODO:: alert to user that he'll have to pick location alone
            }
        );

        fetch('https://0brc1jr0z3.execute-api.eu-west-1.amazonaws.com/v1/weather')
            .then(r => r.json())
            .then(r => {                
                this.setState({ reports: r })
            });
    }

    render(props, state) {        
        // return <span className="wrapper">{ parseInt(Utils.distance(state.myLocation.lat, state.myLocation.lon, 40.78788, -74.014313)) } meters from new york</span>;
        return (
            <div>
                <span>{JSON.stringify(state.reports)}</span>
            </div>
        );
    }
}
 
// render an instance of Clock into <body>:
render(<App />, document.body);