import React, { useState } from 'react'

import { connect } from 'react-redux'

import axios from 'axios'

import { SemanticToastContainer } from 'react-semantic-toasts'

import {
    Input,
    Segment,
    Divider,
    Button,
    Header,
} from 'semantic-ui-react'

import {
    getCountryRequest,
    getCountrySuccess,
    getCountryFailure,
} from '../../redux'

import InfoPanel from './InfoPanel'


const segmentStyle = {
    zIndex: 999,
    position: 'absolute',
    width: '250px',
    top: '10px',
    left: '10px',
    maxHeight: 'calc(100vh - 3vw)',
    overflow: 'auto',
    padding: '20px'
}


const Control = props => {
    const [searchInput, setSearchInput] = useState('')
    const {
        getCountryRequest, 
        getCountrySuccess, 
        getCountryFailure 
    } = props
    
    const handleSearchEntry = e => {
        setSearchInput(e.target.value)
    }

    const handleSearchClick = e => {
        const baseNomintimURL = "https://nominatim.openstreetmap.org/search?country="
        const endURL = "&polygon_geojson=1&format=json"
        getCountryRequest()
        axios.get(`${baseNomintimURL}${searchInput.trim()}${endURL}`)
            .then(response => {
                getCountrySuccess(response)
                // console.log(response)
            })
            .catch(error => {
                getCountryFailure(error)
                // console.log(error)
            })
        //
    }

    
    return (
        <div>
          <Segment style={segmentStyle}>
            <div>
              <span>
                <Header as="h4">World Currency Map with React, Redux, and Leaflet.js</Header>
                <p>
                  Search for a country and receive information about that countries currency.
                  Features available:
                </p>
                <ul>
                    <li><em>Latest Rates</em></li>
                    <li><em>Currency Conversion</em></li>
                    <li><em>Historical Rates</em></li>
                    <li><em>Time-Series Data</em></li>
                    <li><em>Fluctuation</em></li>
                </ul>
                <p>
                  This application consumes the{' '}
                  <a
                    href="https://fixer.io/"
                    target="_blank"
                    rel="noopener noreferrer">
                    Fixer.io API
                  </a>{' '}
                  for current and historical foreign exchange (forex) rates.
                </p>
              </span>
            </div>
            <Header as="h5">Search for a country</Header>
            <div className="flex flex-row">
              <div className="w-80">
                <Input icon='search' onChange={handleSearchEntry} placeholder={searchInput} />
                <div className="mt2">
                <Button size='small' onClick={handleSearchClick} secondary>Search</Button>
                </div>
              </div>
              <div className="w-80">
                
              </div>
              <div className="w-20">
              </div>
            </div>
            <Divider />
            <div>
              <InfoPanel />
            </div>
            <Divider />
            <div>
                {'2020 J. Harris Web Dev'}
            </div>
          </Segment>
          <SemanticToastContainer position="bottom-center" />
        </div>
      )
}


const mapStateToProps = state => {
    return {
        country_data: state.getCountry.country_data,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCountryRequest: () => dispatch(getCountryRequest()),
        getCountrySuccess: response => dispatch(getCountrySuccess(response)),
        getCountryFailure: error => dispatch(getCountryFailure(error)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Control)