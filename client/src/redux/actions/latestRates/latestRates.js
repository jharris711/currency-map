import axios from 'axios'
import types from '../types'

const FIXER_IO_API_KEY = process.env.REACT_APP_FIXER_IO_API_KEY

const getLatestRatesRequest = () => {
    return {
        type: types.GET_LATEST_RATES_REQUEST,
    }
}


const getLatestRatesSuccess = response => {
    console.log(response)
    return {
        type: types.GET_LATEST_RATES_SUCCESS,
        payload: response,
    }
}


const getLatestRatesFailure = error => {
    return {
        type: types.GET_LATEST_RATES_FAILURE,
        payload: error,
    }
}

export const clearLatestRates = () => {
    return {
        type: types.CLEAR_LATEST_RATES,
    }
}


export const getLatestRates = currency_code => {
    const url = {
        base: "https://data.fixer.io/",
        api: "api/latest",
        access_key: `?access_key=${FIXER_IO_API_KEY}`,
        base_symbol: `&base=${currency_code}`,
        symbols: '&symbols=USD,GBP,JPY,EUR,BTC'
    }
    return dispatch => {
        dispatch(getLatestRatesRequest())
        axios.get(`${url.base}${url.api}${url.access_key}${url.base_symbol}${url.symbols}`)
            .then(response => {
                console.log(response)
                dispatch(getLatestRatesSuccess(response))
            })
            .catch(error => {
                dispatch(getLatestRatesFailure(error))
            })
    }

}