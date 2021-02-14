import { combineReducers } from 'redux'

import countryReducer from "./reducers/country/countryReducer"
import latestRatesReducer from './reducers/latestRates/latestRatesReducer'
import symbolsReducer from './reducers/symbols/symbolsReducer'
import tableReducer from './reducers/table/tableReducer'

const rootReducer = combineReducers({
    country: countryReducer,
    latestRates: latestRatesReducer,
    symbols: symbolsReducer,
    table: tableReducer,
})


export default rootReducer