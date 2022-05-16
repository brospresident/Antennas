import * as Leaflet from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import {isAdmin} from '../requests'
import AntennaModal from './AntennaForm';
// import AntennaModal from './AntennaForm'

Leaflet.Icon.Default.imagePath =
'../node_modules/leaflet'

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Map = () => {
    const [position, setPosition] = useState({ lat: 44.4268, lng: 26.1025 });
    const [mousePosition, setMousePosition] = useState({ lat: 0, lng: 0 });
    const [open, setOpen] = useState(false); // for antenna modal

    const handleClick = async (e) => {
        const isAdm = await isAdmin();
        // if (!isAdm) return;

        setMousePosition({ lat: e.latlng.lat, lng: e.latlng.lng });
        const path = window.location.pathname;
        // if (path !== '/admin/add-location') return;
        setOpen(true);
    }

    const LocationFinder = () => {
        useMapEvents({
            click(e) {
                handleClick(e);
            }
        });
        return;
    }

    return (
        <div id="map">
            <MapContainer onClick={handleClick} center={[position.lat, position.lng]} zoom={13} scrollWheelZoom={true} style={{height: '660px', width: '1080px'}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[position.lat, position.lng]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <LocationFinder />
            </MapContainer>
            <AntennaModal open={open} handleClose={() => setOpen(false)} position={mousePosition} />
        </div>
    )
}

export default Map;