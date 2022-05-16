import {Component} from 'react';
import * as Leaflet from 'leaflet';

class Map extends Component {
    constructor () {
        super();
        this.state = {
            lat: 44.4268,
            lng: 26.1025,
            zoom: 7,
            map: null
        };
    }

    componentDidMount() {
        const container = Leaflet.DomUtil.get('mapid');
        if (container !== null) {
            container._leaflet_id = null;
        }
        
        const map = Leaflet.map('mapid').setView([this.state.lat, this.state.lng], 13);

        Leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(map);

        this.setState({map: map});
    }

    render() {
        return (
            <div id="mapid" className = "leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom" style={{height: '660px', width: '1080px'}}></div>
        )
    }
}

export default Map;