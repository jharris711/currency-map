import React, { useEffect } from 'react'

import { connect } from 'react-redux'

import Map from './components/map/Map'
import MUIControl from './components/control/MUIControl'

import { getSymbols } from './redux'

const App = ({
  symbols,
  country_data,
  getSymbols,
}) => {

  // Get the currency symbols from Fixer.io
  // on load:
  useEffect(() => {
    getSymbols()
  }, [getSymbols])

  return (
      <div className="App">
        <Map />
        <MUIControl />
      </div>
  )
}

const mapStateToProps = state => {
  return {
    symbols: state.symbols.symbols,
    country_data: state.getCountry.country_data,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSymbols: () => dispatch(getSymbols()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
