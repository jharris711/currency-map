import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'

import axios from 'axios'

import { makeStyles, withStyles  } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputBase from '@material-ui/core/InputBase'
import FormHelperText from '@material-ui/core/FormHelperText'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PinDropIcon from '@material-ui/icons/PinDrop'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import SyncAltIcon from '@material-ui/icons/SyncAlt';

import {
    getCountryData,
    getLatestRates,
} from '../../redux'

import codes from '../../data/countryCodes'

const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);
  
  const inputStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));

const paperStyles = makeStyles((theme) => ({
  root: {
    zIndex: 999,
    position: 'absolute',
    width: '250px',
    top: '10px',
    left: '10px',
    minHeight: 'calc(100vh - 5vw)',
    maxHeight: 'calc(100vh - 3vw)',
    overflow: 'auto',
    padding: '20px',
    backgroundColor: 'white'
  },
}))


const MUIControl = ({
    symbols,
    country_data,
    latest_rates,
    getCountryData,
    getLatestRates,
}) => {
    const paperClasses = paperStyles()
    const inputClasses = inputStyles()

    const [country, setCountry] = useState('')
    const [symbolOptions, setSymbolsOptions] = useState([])
    const [selectedCurrency, setSelectedCurrency] = useState('DZD')

    // Prepare the symbol options to pass to the
    // dropdown menu:
    useEffect(() => {
        if (symbols !== {}) {
          const dropdown_options = Object.entries(symbols)
            .map(symbol => {
              return { 
                key: symbol[0], 
                text: `${symbol[0]} - ${symbol[1]}`, 
                value: symbol[0]
              }
            })
          setSymbolsOptions(dropdown_options)
        }
    }, [symbols])

    useEffect(() => {
        if (country !== ''){
            getCountryData(country)
        }
    }, [country])


    const handleChange = event => {
        setSelectedCurrency(event.target.value)
    }

    useEffect(() => {
        setCountry(codes[selectedCurrency])
        getLatestRates(selectedCurrency)
    }, [selectedCurrency])

    useEffect(() => {
        console.log(latest_rates)
    }, [latest_rates])

    return (
        <Paper className={paperClasses.root} elevation={3}>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom align="center">
                    World Currency Map with React, Redux, and Leaflet.js
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" gutterBottom align="center">
                    Select a currency and receive information about it!
                    Features available:
                    <ul style={{ listStyle: 'none', textAlign: 'center', padding: '0'}}>
                        <li><em>Latest Rates</em></li>
                        <li><em>Currency Conversion</em></li>
                        <li><em>Historical Rates</em></li>
                        {/* <li><em>Time-Series Data</em></li>
                        <li><em>Fluctuation</em></li> */}
                    </ul>
                    <p>
                    This application consumes the{' '}
                    <a
                        href="https://fixer.io/"
                        target="_blank"
                        rel="noopener noreferrer">
                        Fixer.io
                    </a>{' '}
                    and {' '}
                    <a
                        href="https://nominatim.org/release-docs/develop/api/Search/"
                        target="_blank"
                        rel="noopener noreferrer">
                        Nominatim
                    </a>{' '}
                    APIs.
                    </p>
                </Typography>
            </Grid>
            <br />
            <Divider />
            <br/>
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom align="center">
                    Choose A Currency
                </Typography>
                <FormControl className={inputClasses.margin}>
                <FormHelperText>Select Currency</FormHelperText>
                <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={selectedCurrency}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                    style={{ minWidth: '200px', maxWidth: '200px' }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {symbolOptions.map(symbol => (
                        <MenuItem key={symbol.key} value={symbol.value}>
                        {symbol.text}
                        </MenuItem>
                    ))}
                </Select>
                </FormControl>
            </Grid>
            <br />
            <Grid item xs={12}>
                {/* <Typography variant="subtitle1" gutterBottom>
                   <strong>Currency Info:</strong>
                </Typography> */}
                <Typography variant="body1" gutterBottom align="center">
                    <Grid item xs={12} md={6}>
                        <List dense={true}>
                            <ListItem>
                                <ListItemIcon>
                                    <PinDropIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={country ? country : "Country"}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <MonetizationOnIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={selectedCurrency ? selectedCurrency : "Currency"}
                                />
                            </ListItem>
                        </List>
                    </Grid>
                </Typography>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => {
    return {
      symbols: state.symbols.symbols,
      country_data: state.getCountry.country_data,
      latest_rates: state.latestRates.latest_rates,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCountryData: country => dispatch(getCountryData(country)),
        getLatestRates: currency_code => dispatch(getLatestRates(currency_code)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MUIControl)