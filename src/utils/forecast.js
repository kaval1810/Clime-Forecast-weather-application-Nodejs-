const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/c2cf7c82f86f955c4bc0ea75ebc68e5d/' + latitude + ',' + longitude

    request({ url, json : true }, (error, { body }) => {               //here we use Destructuring Data
             if(error) {
               callback("Unable to connect to weather service. Check internet connction",undefined);
             }
             else if(body.error) {
                  callback("Unable to find Location",undefined);
             }
             else {
               callback(undefined, body.daily.data[0].summary + "  |  "+ body.currently.temperature + " F " + "out.  |  "+" There is a "+ body.currently.precipProbability + '% chance of rain.')
             }
      })
}

module.exports = forecast
