// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { useResizeDetector } from 'react-resize-detector';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const paperStyles = makeStyles((theme) => ({
  root: {
    zIndex: 999,
    position: 'absolute',
    width: '77vw',
    bottom: '16px',
    right: '10px',
    height: '48vh',
    overflow: 'auto',
    backgroundColor: 'white',
  },
}));

const Table = ({ table_data, country_data, latest_rates }) => {
  // eslint-disable-next-line
  const [gridApi, setGridApi] = useState(null);
  // eslint-disable-next-line
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const { width, height, ref } = useResizeDetector();

  const paperClasses = paperStyles();

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.addGlobalListener((type, event) => {});
  };

  const numberSort = (num1, num2) => {
    return num1 - num2;
  };

  return (
    <Paper className={paperClasses.root} elevation={3} ref={ref}>
      <div className="ag-theme-alpine" style={{ height: height - 49, width }}>
        <AgGridReact onGridReady={onGridReady} rowData={table_data}>
          <AgGridColumn
            field="country"
            headerName="Country"
            sortable
            filter
          ></AgGridColumn>
          <AgGridColumn
            field="rates.date"
            headerName="Date (YYYY-MM-DD)"
            sortable
            filter
          ></AgGridColumn>
          <AgGridColumn
            field="symbol"
            headerName="Symbol"
            sortable
            filter
          ></AgGridColumn>
          <AgGridColumn
            field="rates.rates.USD"
            headerName="USD"
            comparator={numberSort}
            filter="agNumberColumnFilter"
            sortable
          ></AgGridColumn>
          <AgGridColumn
            field="rates.rates.GBP"
            headerName="GBP"
            comparator={numberSort}
            filter="agNumberColumnFilter"
            sortable
          ></AgGridColumn>
          <AgGridColumn
            field="rates.rates.EUR"
            headerName="EUR"
            comparator={numberSort}
            filter="agNumberColumnFilter"
            sortable
          ></AgGridColumn>
          <AgGridColumn
            field="rates.rates.JPY"
            headerName="JPY"
            comparator={numberSort}
            filter="agNumberColumnFilter"
            sortable
          ></AgGridColumn>
          <AgGridColumn
            field="rates.rates.BTC"
            headerName="BTC"
            comparator={numberSort}
            filter="agNumberColumnFilter"
            sortable
          ></AgGridColumn>
        </AgGridReact>
      </div>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    table_data: state.table.table_data,
    country_data: state.country.country_data,
    latest_rates: state.latestRates.latest_rates,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
