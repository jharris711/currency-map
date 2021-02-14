import types from '../../actions/types'


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
                get_latest_rates_loading: false,
                get_latest_rates_status: null,
                get_latest_rates_error: '',
                latest_rates: [],
            }
        case types.GET_LATEST_RATES_SUCCESS:
            return {
                ...state,
                get_latest_rates_loading: false,
                get_latest_rates_status: action.payload.status,
                latest_rates: action.payload.data
            }
        case types.GET_LATEST_RATES_FAILURE:
            return {
                ...state,
                get_latest_rates_error: action.payload
            }
        default: return state
    }
}


export default latestRatesReducer