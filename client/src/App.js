import React from 'react'

import { Provider } from 'react-redux'
import store from './redux/store'

import Map from './components/Map'
import Control from './components/control/Control'

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Map />
        <Control />
      </div>
    </Provider>
  )
}

export default App
