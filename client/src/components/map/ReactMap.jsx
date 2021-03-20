// eslint-disable-next-line
import React, { useEffect, useState, useRef } from 'react';

import { connect } from 'react-redux';

import moment from 'moment';

// import L from 'leaflet';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
  ZoomControl,
  GeoJSON,
  MapConsumer,
} from 'react-leaflet';

import Typography from '@material-ui/core/Typography';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

// ThunderForest api key for base map tiles:
const thunderforestAPIkey = process.env.REACT_APP_THUNDERFOREST_API_KEY;

const maps = {
  light: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  dark:
    'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
  spinal: `https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=${thunderforestAPIkey}`,
};

const ReactMap = ({ country_data, latest_rates, table_data }) => {
  const [map, setMap] = useState(null);
  // eslint-disable-next-line
  const [color, setColor] = useState('rgb(65, 83, 175)');
  const [fillOpacity, setFillOpacity] = useState(0.0);

  const onGeoJsonMouseEvent = (event, type) => {
    switch (type) {
      case 'over':
        setFillOpacity(0.5);
        break;
      case 'out':
        setFillOpacity(0.0);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <MapContainer
        center={[-10, -45]}
        zoom={3}
        zoomControl={false}
        style={{ height: '100vh', width: '100%' }}
        whenCreated={(map) => setMap(map)}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Light Map">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={maps.light}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Dark Map">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={maps.dark}
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay name="Country Borders" checked>
            <LayerGroup>
              {Array.from(country_data).map((country) => {
                let matching_data = table_data.find((c) => {
                  console.log(c);
                  return c.country === country.display_name;
                });
                return (
                  <>
                    <GeoJSON
                      key={`${country.display_name}-geojson`}
                      data={country.geojson}
                      pathOptions={{
                        color,
                        weight: 2,
                        opacity: 1,
                        fillOpacity,
                      }}
                      eventHandlers={{
                        mouseover: (event, type) =>
                          onGeoJsonMouseEvent(event, 'over'),
                        mouseout: (event, type) =>
                          onGeoJsonMouseEvent(event, 'out'),
                      }}
                    />
                    <Marker
                      key={`${country.display_name}-marker`}
                      position={[country.lat, country.lon]}
                      eventHandlers={{
                        add: () => {
                          map.flyTo([country.lat, country.lon]);
                        },
                      }}
                    >
                      <Popup key={`${country.display_name}-popup`}>
                        <Typography variant="h6" align="center">
                          {country.display_name}
                        </Typography>
                      </Popup>
                    </Marker>
                  </>
                );
              })}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
        <ZoomControl position="topright" />
      </MapContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    latest_rates: state.latestRates.latest_rates,
    country_data: state.country.country_data,
    table_data: state.table.table_data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactMap);
