import { h, render, Component } from 'preact';
import * as Utils from './utils';
class App extends Component {
    constructor () {
        super();

        this.state = {
            defaultWeather: {},
            crowdWeather: {},
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
    }

    render(props, state) {        
        return <span>{ parseInt(Utils.distance(state.myLocation.lat, state.myLocation.lon, 40.78788, -74.014313)) } meters from new york</span>;
    }
}
 
// render an instance of Clock into <body>:
render(<App />, document.body);