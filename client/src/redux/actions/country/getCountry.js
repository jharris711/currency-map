import types from '../types'


export const getCountryRequest = () => {
    return {
        type: types.GET_COUNTRY_REQUEST,
    }
}


export const getCountrySuccess = response => {
    return {
        type: types.GET_COUNTRY_SUCCESS,
        payload: response,
    }
}


export const getCountryFailure = error => {
    return {
        type: types.GET_COUNTRY_FAILURE,
        payload: error,
    }
}