function GenericError (errorResp) {
  this.name = 'GenericError'
  this.errorResp = errorResp
}

GenericError.prototype = Error.prototype

export default GenericError
