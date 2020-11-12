# Currency Map (React / Redux / Leaflet.js)
Map app that displays information about selected countries' currencies.
 

This app uses the [Nominatim API](https://nominatim.org/release-docs/develop/api/Overview/) to request 
geoJSON data for each country and the [Fixer.io API](https://fixer.io/documentation) to request currency
information.

### To Start:
###### Clone the repo and change into client dir:
```bash
$ git clone https://github.com/jharris711/currency-map.git && cd client
```

###### Install Dependencies:
```bash
$ npm install
```

###### Start the server:
```bash
$ npm start
```

*The app will be available in the browser at <http://localhost:3000>*

### Packages Used:
- [Axios](https://github.com/axios/axios)
- [Chroma.js](https://gka.github.io/chroma.js/)
- [Leaflet](https://leafletjs.com/)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [React-Redux](https://react-redux.js.org/)
- [Redux-Logger](https://github.com/LogRocket/redux-logger#readme)
- [Redux-Thunk](https://github.com/reduxjs/redux-thunk)
- [Semantic-UI-React](https://react.semantic-ui.com/)
- [Tachyons](https://tachyons.io/)
