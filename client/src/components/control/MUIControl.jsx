import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PinDropIcon from '@material-ui/icons/PinDrop';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { useSnackbar } from 'notistack';

import {
  getCountryData,
  getLatestRates,
  sendDataToTable,
  clearCountryData,
  clearLatestRates,
} from '../../redux';

import codes from '../../data/countryCodes';
import { addToOrRemoveFromArray } from '../../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const paperStyles = makeStyles((theme) => ({
  root: {
    zIndex: 999,
    position: 'absolute',
    width: '20vw',
    top: '10px',
    left: '10px',
    minHeight: '97vh',
    maxHeight: '97vh',
    overflow: 'auto',
    backgroundColor: 'white',
  },
}));

const listStyles = makeStyles((theme) => ({
  root: {
    // maxHeight: '25vh',
    // width: '12.5vw',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.pape,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  nestedDark: {
    paddingLeft: theme.spacing(4),
    backgroundColor: '#e0e0e0',
  },
}));

const MUIControl = ({
  symbols,
  country_data,
  latest_rates,
  get_country_loading,
  get_latest_rates_loading,
  getCountryData,
  getLatestRates,
  sendDataToTable,
  clearCountryData,
  clearLatestRates,
}) => {
  const classes = useStyles();
  const paperClasses = paperStyles();
  const listClasses = listStyles();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [countries, setCountries] = useState([]);
  const [selectValue, setSelectValue] = useState('');
  const [symbolOptions, setSymbolsOptions] = useState([]);
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);

  const action = () => {
    return (
      <>
        <div style={{ padding: 0 }}>
          <CircularProgress size={18} thickness={5} color="secondary" />
        </div>
      </>
    );
  };

  const handleChange = (event) => {
    const selection = event.target.value;
    const addOrRemoveSelection = addToOrRemoveFromArray(
      selection,
      Array.from(selectedCurrencies)
    );
    setSelectValue(selection);
    setSelectedCurrencies(addOrRemoveSelection);
  };

  // Prepare the symbol options to pass to the
  // dropdown menu:
  useEffect(() => {
    if (symbols !== {}) {
      const dropdown_options = Object.entries(symbols).map((symbol) => {
        return {
          key: symbol[0],
          text: `${symbol[0]} - ${symbol[1]}`,
          value: symbol[0],
        };
      });
      setSymbolsOptions(dropdown_options);
    }
  }, [symbols]);

  useEffect(() => {
    Array.from(countries).forEach((c) => {
      getCountryData(c);
    });
  }, [countries, getCountryData]);

  useEffect(() => {
    console.log(selectedCurrencies);
    if (Array.from(selectedCurrencies) !== []) {
      const country_arr = Array.from(selectedCurrencies).map(
        (selection) => codes[selection]
      );
      setCountries(country_arr);
    }
  }, [selectedCurrencies, getLatestRates]);

  useEffect(() => {
    console.log(selectedCurrencies);
    if (selectedCurrencies !== []) {
      Array.from(selectedCurrencies).forEach((currency) =>
        getLatestRates(currency)
      );
    }
  }, [selectedCurrencies, getLatestRates]);

  useEffect(() => {
    const data_for_table = Array.from(selectedCurrencies).map(
      (symbol, index) => {
        return {
          symbol,
          country: countries[index],
          rates: latest_rates[index],
        };
      }
    );
    sendDataToTable(data_for_table);
  }, [countries, selectedCurrencies, latest_rates, sendDataToTable]);

  useEffect(() => {
    let lr_noti;
    if (get_latest_rates_loading === true) {
      lr_noti = enqueueSnackbar('Fetching latest exchange rates...', {
        persist: true,
        action,
      });
    } else {
      closeSnackbar(lr_noti);
    }
  }, [get_latest_rates_loading, enqueueSnackbar, closeSnackbar]);

  useEffect(() => {
    let c_noti;
    if (get_country_loading) {
      c_noti = enqueueSnackbar('Fetching country data...', {
        persist: true,
        action,
      });
    } else {
      closeSnackbar(c_noti);
    }
  }, [get_country_loading, enqueueSnackbar, closeSnackbar]);

  const handleRemoveSelection = (event, selection, country) => {
    const updated = addToOrRemoveFromArray(
      selection,
      Array.from(selectedCurrencies)
    );
    setSelectedCurrencies(updated);
  };

  return (
    <Paper className={paperClasses.root} elevation={3}>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          style={{ padding: '10px' }}
        >
          World Currency Map with React, Redux, and Leaflet.js
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="body1"
          gutterBottom
          align="center"
          style={{ padding: '10px' }}
        >
          Select a currency and receive information about it! Features
          available:
          <ul style={{ listStyle: 'none', textAlign: 'center', padding: '0' }}>
            <li>
              <em>Latest Rates</em>
            </li>
            <li>
              <em>Currency Conversion</em>
            </li>
            <li>
              <em>Historical Rates</em>
            </li>
            {/* <li><em>Time-Series Data</em></li>
                        <li><em>Fluctuation</em></li> */}
          </ul>
          <p>
            This application consumes the{' '}
            <a
              href="https://fixer.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fixer.io
            </a>{' '}
            and{' '}
            <a
              href="https://nominatim.org/release-docs/develop/api/Search/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nominatim
            </a>{' '}
            APIs.
          </p>
        </Typography>
      </Grid>
      <br />
      <Divider />
      <br />
      <Grid item xs={12}>
        <Typography
          variant="h6"
          gutterBottom
          align="center"
          style={{ padding: '5px' }}
        >
          Choose A Currency
        </Typography>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TextField
              id="standard-select-currency"
              select
              label="Select"
              value={selectValue}
              onChange={handleChange}
              helperText="Please select a currency"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {symbolOptions.map((symbol) => (
                <MenuItem key={symbol.key} value={symbol.value}>
                  {symbol.text}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </form>
      </Grid>
      <br />
      <Grid item xs={12}>
        <Typography
          variant="body1"
          gutterBottom
          align="center"
          style={{ padding: '10px' }}
        >
          <Grid item xs={12} md={6}>
            <List dense={true} className={listClasses.root}>
              {Array.from(selectedCurrencies).map((curr, index) => {
                return (
                  <>
                    <ListItem>
                      <ListItemIcon>
                        <PinDropIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={countries ? countries[index] : 'Country'}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <MonetizationOnIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          selectedCurrencies
                            ? selectedCurrencies[index]
                            : 'Currency'
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <Button
                        variant="contained"
                        color="default"
                        startIcon={<HighlightOffIcon />}
                        size="small"
                        onClick={(event, selection, country) =>
                          handleRemoveSelection(
                            event,
                            selectedCurrencies[index]
                          )
                        }
                      >
                        Remove Selection
                      </Button>
                    </ListItem>
                    <Divider />
                  </>
                );
              })}
            </List>
          </Grid>
        </Typography>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    symbols: state.symbols.symbols,
    country_data: state.country.country_data,
    get_country_loading: state.country.get_country_loading,
    latest_rates: state.latestRates.latest_rates,
    get_latest_rates_loading: state.latestRates.get_latest_rates_loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCountryData: () => dispatch(clearCountryData()),
    clearLatestRates: () => dispatch(clearLatestRates()),
    sendDataToTable: (data) => dispatch(sendDataToTable(data)),
    getCountryData: (country) => dispatch(getCountryData(country)),
    getLatestRates: (currency_code) => dispatch(getLatestRates(currency_code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MUIControl);
