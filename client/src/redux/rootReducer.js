import { combineReducers } from 'redux'

import getCountryReducer from "./reducers/country/getCountryReducer"
import getLatestRatesReducer from './reducers/latestRates/getLatestRatesReducer'
import symbolsReducer from './reducers/symbols/symbolsReducer'

const rootReducer = combineReducers({
    getCountry: getCountryReducer,
    getLatestRates: getLatestRatesReducer,
    symbols: symbolsReducer,
})


export default rootReducer