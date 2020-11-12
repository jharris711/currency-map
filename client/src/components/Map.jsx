import React, { Component } from 'react'

import { connect } from 'react-redux'

import L from 'leaflet'


import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility';

// Define the container styles the map sits in:
const style = {
    overflow: 'hidden',
    width: '100%',
    height: '100vh',
}

// ThunderForest api key for base map tiles:
const thunderforestAPIkey = process.env.REACT_APP_THUNDERFOREST_API_KEY

// Base map tile:
const map_tile = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}')
// Dark map:
const dark_map = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png')
// Spinal Tap Map aka Spinal Map:
const spinal_map = L.tileLayer(`https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=${thunderforestAPIkey}`)

const country_border_layer = L.layerGroup()
const country_point_marker = L.layerGroup()

// Params to be passed to the map:
const mapParams = {
    center: [20, -20],
    zoom: 4,
    zoomControl: false,
    maxBounds: L.latLngBounds(L.latLng(-150, -250), L.latLng(150, 250)),
    layers: [
        map_tile,
        country_border_layer,
        country_point_marker,
    ]
}


class Map extends Component {
    // When component is first rendered:
    componentDidMount() {
        // Create the map using the id found in the div:
        this.map = L.map('map', mapParams)

        // Set Base map in Layer control:
        const baseMaps = {
            'OpenStreetMap': map_tile,
            'DarkStreetMap': dark_map,
            'SpinalMap': spinal_map,
        }

        const overlayMaps = {
            'Country Border': country_border_layer
        }

        // Create the layer control:
        L.control
            .layers(baseMaps, overlayMaps)
            .addTo(this.map)
        //

        // Add a zoom control:
        L.control
            .zoom({position: "topright"})
            .addTo(this.map)
        //

        // applyCountryBorder(country_border_layer, "United States")
    }

    addBorder() {
        country_border_layer.clearLayers()
        const { country_data } = this.props
        console.log(country_data)
        if (country_data !== []) {
            // const color = chroma.random()
            const color = 'rgb(65, 83, 175)'
            try {
                let border = L.geoJSON(country_data.geojson, {
                    color,
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.0 
                })
                    .addTo(country_border_layer)
                border.on('mouseover', () => {
                    border.setStyle({fillColor: color, fillOpacity: 0.6})
                })
                border.on('mouseout', () => {
                    border.setStyle({fillOpacity: 0.0})
                })
            } catch (error) {
                console.log(error)
            }
        } 
    }

    addPointMarker() {
        country_point_marker.clearLayers()
        const { country_data } = this.props
        if (country_data !== []) {
            try {
                L.marker(
                    [country_data.lat, country_data.lon]
                )
                    .addTo(country_point_marker)
                    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
                    .openPopup()
            } catch (error) {
                console.log(error)
            }
        } 
    }

    componentDidUpdate(prevProps) {
        const { country_data, latest_rates } = this.props
        if (country_data !== prevProps.country_data) {
            // console.log(country_data)
            this.addBorder()
            this.addPointMarker()
        }

        if (latest_rates !== prevProps.latest_rates) {
            console.log(latest_rates)
        }
    }

    render() {
        return (
            <div id="map" style={style} />
        )
    }
}


const mapStateToProps = state => {
    return {
        latest_rates: state.getLatestRates.latest_rates,
        country_data: state.getCountry.country_data,
    }
}


const mapDispatchToProps = state => {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Map)