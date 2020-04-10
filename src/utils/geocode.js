const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoia2F2YWwxOCIsImEiOiJjazhzZ2dwdmQwaTZkM2xxYW9jdGtudjJzIn0.z9XnCMnbFq6jOkCv7GvqJw&limit=1'

    request({ url, json : true }, (error, { body } = {}) => {                           //here we use Destructuring Data
      if(error) {
        callback('Unable to connect to Location. Check internet connction', undefined);
        }
      else if(body.features.length === 0) {
       callback('Unable to find Location. check your location',undefined);
        }
      else {
       callback(undefined, {
         latitude: body.features[0].center[1],
         longitude: body.features[0].center[0],
         location: body.features[0].place_name
       })
     }
    })
}

module.exports = geocode
