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
```json
"dependencies": {
    "@material-ui/core": "^4.11.3",
    "@material-ui/icons": "^4.11.2",
    "@turf/turf": "^5.1.6",
    "axios": "^0.21.1",
    "chroma-js": "^2.1.0",
    "jquery": "^3.5.1",
    "leaflet": "^1.7.1",
    "leaflet-defaulticon-compatibility": "^0.1.1",
    "prop-types": "^15.7.2",
    "react": "^16.14.0",
    "react-dom": "^16.14.0",
    "react-redux": "^6.0.1",
    "react-scripts": "^3.4.4",
    "redux": "^4.0.5",
    "redux-logger": "^3.0.6",
    "redux-thunk": "^2.3.0",
    "tachyons": "^4.12.0"
  }
```
