import types from '../types'


export const getLatestRatesRequest = () => {
    return {
        type: types.GET_LATEST_RATES_REQUEST,
    }
}


export const getLatestRatesSuccess = response => {
    return {
        type: types.GET_LATEST_RATES_SUCCESS,
        payload: response,
    }
}


export const getLatestRatesFailure = error => {
    return {
        type: types.GET_LATEST_RATES_FAILURE,
        payload: error,
    }
}