import L from 'leaflet'

export const addBorder = (
    border_layer, 
    data,
) => {
    border_layer.clearLayers()
    if (data !== []) {
        // const color = chroma.random()
        const color = 'rgb(65, 83, 175)'
        try {
            let border = L.geoJSON(data.geojson, {
                color,
                weight: 2,
                opacity: 1,
                fillOpacity: 0.0 
            })
                .addTo(border_layer)
            border.on('mouseover', () => {
                border.setStyle({fillColor: color, fillOpacity: 0.6})
            })
            border.on('mouseout', () => {
                border.setStyle({fillOpacity: 0.0})
            })
        } catch (error) {
            console.log(error)
        }
    } 
}