const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3JpamFuNGZyaWVuZHMiLCJhIjoiY2p1bjI0MHoxMGV4bDQ2cG40eGZjbDQ0cSJ9.9wm-7EuNAwfzsUQ3LcKOEQ&limit=1'

    request({url, json: true}, (error, {body}) => {//shorthanding url, destructuring response by only using body
        if(error){
            callback('Unable to reach map api!')
        } else if(body.features.length ===0){
            callback('unable to find the location!')
        } else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })            
        }
    })
}

module.exports =  geocode