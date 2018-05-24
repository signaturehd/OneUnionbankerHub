function ForbiddenError () {
  this.name = 'ForbiddenError'
}

ForbiddenError.prototype = Error.prototype

export default ForbiddenError
