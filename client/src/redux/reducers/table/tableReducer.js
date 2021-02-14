import types from '../../actions/types'


const initialState = {
    table_data: [],
}


const tableReducer = ( state = initialState, action) => {
    switch(action.type) {
        case types.HANDLE_SEND_DATA_TO_TABLE:
            return {
                ...state,
                table_data: action.payload,
            }
        default: return state
    }
}


export default tableReducer