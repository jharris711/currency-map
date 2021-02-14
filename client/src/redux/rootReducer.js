import { combineReducers } from 'redux'

import getCountryReducer from "./reducers/country/getCountryReducer"
import latestRatesReducer from './reducers/latestRates/latestRatesReducer'
import symbolsReducer from './reducers/symbols/symbolsReducer'

const rootReducer = combineReducers({
    getCountry: getCountryReducer,
    latestRates: latestRatesReducer,
    symbols: symbolsReducer,
})


export default rootReducer