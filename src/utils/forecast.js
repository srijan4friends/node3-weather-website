const request = require('request')

const forecast = (lattitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/e3b0a4348e4cb13ac5ae74f3a8168c1c/' + lattitude +',' + longitude + '?units=si'

    request({ url, json: true }, (error, {body}) => {//shorthanding url, destructuring response by only using body
        //console.log(response.body.currently)
        if(error){
            callback('Unable to access the weather api!')
        }else if(body.error){
            callback(body.error)
        }else{
            callback(undefined,body.daily.data[0].summary + ' It is currently '+ body.currently.temperature + ' degrees celcius out. There is a ' +
            body.currently.precipProbability + '% chance of rain.' + 'Highest temperture: ' + body.daily.data[0].temperatureHigh
            + ' and lowest will be: ' + body.daily.data[0].temperatureLow)
        }

    })
}

module.exports = forecast