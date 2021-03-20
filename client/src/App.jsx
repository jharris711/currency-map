import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import ReactMap from './components/map/ReactMap';
import MUIControl from './components/control/MUIControl';
import Table from './components/table/Table';

import { getSymbols } from './redux';

import CircularProgress from '@material-ui/core/CircularProgress';

import { useSnackbar } from 'notistack';

const App = ({ symbols, symbols_loading, country_data, getSymbols }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const action = () => {
    return (
      <>
        <div style={{ padding: 0 }}>
          <CircularProgress size={18} thickness={5} color="secondary" />
        </div>
      </>
    );
  };
  // Get the currency symbols from Fixer.io
  // on load:
  useEffect(() => {
    getSymbols();
  }, [getSymbols]);

  useEffect(() => {
    let s_noti;
    if (symbols_loading) {
      enqueueSnackbar('Fetching currency symbols...', {
        persist: true,
        action,
      });
    } else {
      closeSnackbar(s_noti);
    }
  }, [symbols_loading, enqueueSnackbar, closeSnackbar]);

  return (
    <div className="App">
      <ReactMap />
      <MUIControl />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    symbols: state.symbols.symbols,
    country_data: state.country.country_data,
    symbols_loading: state.symbols.symbols_loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSymbols: () => dispatch(getSymbols()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
