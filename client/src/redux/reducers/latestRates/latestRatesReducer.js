import types from '../../actions/types'
import { addToOrRemoveFromArray } from '../../../utils'

const initialState = {
    get_latest_rates_loading: false,
    get_latest_rates_status: null,
    get_latest_rates_error: '',
    latest_rates: [],
}


const latestRatesReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.GET_LATEST_RATES_REQUEST:
            return {
                ...state,
                get_latest_rates_loading: true,
                get_latest_rates_status: null,
                get_latest_rates_error: '',
                latest_rates: [],
            }
        case types.GET_LATEST_RATES_SUCCESS:
            console.log(action.payload.data)
            return {
                ...state,
                get_latest_rates_loading: false,
                get_latest_rates_status: action.payload.status,
                latest_rates: addToOrRemoveFromArray(action.payload.data, Array.from(state.latest_rates))
            }
        case types.GET_LATEST_RATES_FAILURE:
            return {
                ...state,
                get_latest_rates_error: action.payload
            }
        case types.CLEAR_LATEST_RATES:
            return {
                ...state,
                latest_rates: []
            }
        default: return state
    }
}


export default latestRatesReducer