const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/fff5f65cf4378e7414aad29520529bfb/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => { //解構賦值簡寫: response.body
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) { 
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. The highest temperature is ' + body.daily.data[0].temperatureHigh + ' and the lowest emperature is ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast