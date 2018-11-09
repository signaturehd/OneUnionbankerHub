function NoPictureError (profile) {
  this.name = 'NoPictureError'
  this.profile = profile
}

NoPictureError.prototype = Error.prototype

export default NoPictureError
