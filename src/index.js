import { h, render, Component } from 'preact';
 
class App extends Component {
    constructor () {
        super();
        this.state = {
            lat: null,
            lon: null
        }
    }

    componentDidMount () {
        navigator.geolocation.getCurrentPosition(
            // user allowed position
            (currentPos) => {
                this.setState({ 
                    lat: currentPos.coords.latitude,
                    lon: currentPos.coords.longitude,
                })
            }, 
            // user denied position
            (error) => {
                // TODO:: alert to user that he'll have to pick location alone
            }
        )
    }

    render(props, state) {        
        return <span>{ JSON.stringify(state.lat) }</span>;
    }
}
 
// render an instance of Clock into <body>:
render(<App />, document.body);