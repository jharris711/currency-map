import L from 'leaflet'

export const addPointMarker = (
    point_marker_layer,
    data,
    latest_rates,
) => {
    console.log(latest_rates)
    let base_currency
    let rates
    if (latest_rates) {
        base_currency = latest_rates.base
        rates = latest_rates.rates
    }
    console.log(base_currency, rates)
    point_marker_layer.clearLayers()
    console.log(latest_rates)
    if (data !== []) {
        try {
            L.marker(
                [data.lat, data.lon]
            )
                .addTo(point_marker_layer)
                .bindPopup(`<div><div><h3>Currency: ${base_currency}</h3></div><div><h5>Exhange Rates</h5><ul><li>USD: ${rates.USD}</li><li>GBP: ${rates.GBP}</li><li>JPY: ${rates.JPY}</li><li>EUR: ${rates.EUR}</li></ul></div></div>`)
                .openPopup()
        } catch (error) {
            console.log(error)
        }
    } 
}