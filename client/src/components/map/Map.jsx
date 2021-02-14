import React, { useEffect } from 'react'

import { connect } from 'react-redux'

import L from 'leaflet'

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility'

import { addBorder, addPointMarker } from '../../utils'

// Define the container styles the map sits in:
const style = {
    overflow: 'hidden',
    width: '100%',
    height: '100vh',
}

// ThunderForest api key for base map tiles:
const thunderforestAPIkey = process.env.REACT_APP_THUNDERFOREST_API_KEY

const maps = {
    light: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'),
    dark: L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'),
    spinal: L.tileLayer(`https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=${thunderforestAPIkey}`),
}

const country = {
    border: L.layerGroup(),
    point_marker: L.layerGroup(),
}

// Params to be passed to the map:
const mapParams = {
    center: [20, -20],
    zoom: 3,
    zoomControl: false,
    maxBounds: L.latLngBounds(L.latLng(-150, -250), L.latLng(150, 250)),
    layers: [
        maps.light,
        country.border,
        country.point_marker,
    ]
}

const Map = ({
    country_data,
    latest_rates,
}) => {

    // When component is first rendered:
    useEffect(() => {
        const map = L.map('map', mapParams)

        // Set Base map in Layer control:
        const baseMaps = {
            'OpenStreetMap': maps.light,
            'DarkStreetMap': maps.dark,
            'SpinalMap': maps.spinal,
        }

        const overlayMaps = {
            'Country Border': country.border
        }

        // Create the layer control:
        L.control
            .layers(baseMaps, overlayMaps)
            .addTo(map)
        //

        // Add a zoom control:
        L.control
            .zoom({position: "topright"})
            .addTo(map)
        //
    }, [])

    // Any time country_data updates:
    useEffect(() => {
        if (country_data) {
            console.log()
            country.border.clearLayers()
            country.point_marker.clearLayers()
            Array.from(country_data).forEach(c => {
                console.log(c)
                addBorder(country.border, c)
                addPointMarker(country.point_marker, c, latest_rates)
            })
        }
    }, [country_data, latest_rates])

    return (
        <div id="map" style={style} />
    )
}


const mapStateToProps = state => {
    return {
        latest_rates: state.latestRates.latest_rates,
        country_data: state.country.country_data,
    }
}


const mapDispatchToProps = state => {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Map)