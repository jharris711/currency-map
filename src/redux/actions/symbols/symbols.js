import axios from 'axios'
import types from '../types'

const FIXER_IO_API_KEY = process.env.REACT_APP_FIXER_IO_API_KEY


const getSymbolsRequest = () => {
    return {
        type: types.GET_SYMBOLS_REQUEST
    }
}


const getSymbolsSuccess = response => {
    return {
        type: types.GET_SYMBOLS_SUCCESS,
        payload: response
    }
}

const getSymbolsFailure = error => {
    return {
        type: types.GET_SYMBOLS_FAILURE,
        payload: error
    }
}


export const getSymbols = () => {
    return dispatch => {
        dispatch(getSymbolsRequest())
        const url = {
            base: 'http://data.fixer.io/',
            api: `api/symbols`,
            key: `?access_key=${FIXER_IO_API_KEY}`
        }
        axios.get(`${url.base}${url.api}${url.key}`)
            .then(response => {
                dispatch(getSymbolsSuccess(response.data.symbols))
            })
            .catch(error => {
                dispatch(getSymbolsFailure(error))
            })
    }
}