module.exports = function (config) {
  var Service = {}

  const request = require('request')
  const deviceId = process.env.PARTICLE_DEVICE_1 || config.particle.deviceIds[0]
  const particleAccessToken = process.env.PARTICLE_ACCESS_TOKEN || config.particle.accessToken

  Service.initialize = function (callback) {
    // check if the feeding device is ready
    request.get(`https://api.spark.io/v1/devices/${deviceId}`, {qs: {access_token: particleAccessToken}}, function (err, httpResponse, body) {
      if (err) return callback(err)
      if (httpResponse.statusCode !== 200) return callback(new Error('Particle endpoint unreachable'))
      console.log('feedFishService initialized')
      callback()
    })
  }

  Service.feed = function (callback) {
    console.log('feeding')
    request.post(`https://api.spark.io/v1/devices/${deviceId}/feed`, {form: {access_token: particleAccessToken}}, function (err, httpResponse, body) {
      console.log(httpResponse.statusCode)
      if (err) return callback(err)
      if (httpResponse.statusCode !== 200) return callback(new Error('Particle endpoint unreachable'))
      callback()
    })
  }

  return Service
}
