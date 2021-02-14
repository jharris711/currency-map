import types from '../../actions/types'


const initialState = {
    symbols: {},
    symbols_loading: false,
    symbols_error: [],
}


const symbolsReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.GET_SYMBOLS_REQUEST:
            return {
                ...state,
                symbols_loading: true
            }
        case types.GET_SYMBOLS_SUCCESS:
            return {
                ...state,
                symbols_loading: false,
                symbols: action.payload,
            }
        case types.GET_SYMBOLS_FAILURE:
            return {
                ...state,
                symbols_loading: false,
                error: action.payload
            }
        default: return state
    }
}


export default symbolsReducer