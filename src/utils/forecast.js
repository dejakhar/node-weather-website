const request = require('request')

//const url = 'http://api.weatherstack.com/current?access_key=aa434e107ca05cf34210d6254e0e7d81&query=28.7041,77.1025'

const forecast = (lat, long, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=aa434e107ca05cf34210d6254e0e7d81&query=' + lat +','+long

    request({url: url, json: true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect to location services', undefined)
        } else if(body.error) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            const forecast_str = body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degree outside with "
            + body.current.precip + "% chances of rain"
            callback(undefined, forecast_str)
        }
    })
}

module.exports = forecast