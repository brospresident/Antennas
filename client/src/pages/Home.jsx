import {Component} from 'react';
import Header from '../components/Header';
import Map from '../components/Map';

const text = {
    fontSize: '1.5em',
    color: '#000',
    textAlign: 'center',
    margin: '0 auto',
    padding: '1em',
    width: '50%',
}

// Create a container that centers everything inside it
const container = {
    textAlign: 'center',
    margin: '0 auto',
    padding: '1em',
    width: '50%',
}

class Home extends Component {
    render() {
        return (
        <div>
            <Header />
            <div style = {text}>This project aims to provide an interactive map of all 5G Antennas from Romania</div>
            <div style = {container}>
                <Map />
            </div>
        </div>
        );
    }
}

export default Home;