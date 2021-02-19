import types from '../../actions/types'
import { addToOrRemoveFromArray } from '../../../utils'


const initialState = { 
    get_country_loading: false,
    get_country_status: null,
    country_data: [],
    get_country_error: '',
}


const countryReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.GET_COUNTRY_REQUEST:
            return {
                ...state,
                get_country_loading: true,
                get_country_status: null,
                country_data: [],
                get_country_error: ''
            }
        case types.GET_COUNTRY_SUCCESS:
            console.log(action.payload.data[0])
            return {
                ...state,
                get_country_loading: false,
                country_data: addToOrRemoveFromArray(action.payload.data[0], Array.from(state.country_data)),
                get_country_status: action.payload.status,
            }
        case types.GET_COUNTRY_FAILURE:
            return {
                ...state,
                get_country_loading: false,
                get_country_error: action.payload,
             }
        case types.CLEAR_COUNTRY_DATA:
            return {
                ...state,
                country_data: []
            }
        default: return state
    }
}


export default countryReducer
