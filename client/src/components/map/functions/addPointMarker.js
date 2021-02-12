import L from 'leaflet'

export const addPointMarker = (
    point_marker_layer,
    data,
) => {
    point_marker_layer.clearLayers()
    if (data !== []) {
        try {
            L.marker(
                [data.lat, data.lon]
            )
                .addTo(point_marker_layer)
                .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
                .openPopup()
        } catch (error) {
            console.log(error)
        }
    } 
}