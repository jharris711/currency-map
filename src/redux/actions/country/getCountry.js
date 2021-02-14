import axios from 'axios'
import types from '../types'
import EuropeanContinentalData from '../../../data/Europe.json'

const getCountryRequest = () => {
    return {
        type: types.GET_COUNTRY_REQUEST,
    }
}


const getCountrySuccess = response => {
    return {
        type: types.GET_COUNTRY_SUCCESS,
        payload: response,
    }
}


const getCountryFailure = error => {
    return {
        type: types.GET_COUNTRY_FAILURE,
        payload: error,
    }
}

export const getCountryData = country => {
    return dispatch => {
        dispatch(getCountryRequest())
        if (country === 'European Union') {
            const data = {data: EuropeanContinentalData.features}
            dispatch(getCountrySuccess(data))
        } else {
            const url = {
                base: "https://nominatim.openstreetmap.org",
                api: `/search?q=${country}`,
                args: "&polygon_geojson=1&format=json",
            }
            axios.get(`${url.base}${url.api}${url.args}`)
                .then(response => {
                    dispatch(getCountrySuccess(response))
                })
                .catch(error => {
                    dispatch(getCountryFailure(error))
                })
        }
    }
}