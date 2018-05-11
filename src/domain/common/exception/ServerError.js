function ServerError (message = '') {
  this.name = 'ServerError'
  this.message = message
}

ServerError.prototype = Error.prototype

export default ServerError
