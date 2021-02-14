import types from '../types'


export const sendDataToTable = data => {
    return {
        type: types.HANDLE_SEND_DATA_TO_TABLE,
        payload: data
    }
}