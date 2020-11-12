import { combineReducers } from 'redux'

import getCountryReducer from "./reducers/country/getCountryReducer"
import getLatestRatesReducer from './reducers/latestRates/getLatestRatesReducer'


const rootReducer = combineReducers({
    getCountry: getCountryReducer,
    getLatestRates: getLatestRatesReducer,
})


export default rootReducer