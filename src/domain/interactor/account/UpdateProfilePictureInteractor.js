export default class UpdateProfilePictureInteractor {
  constructor (client) {
    this.client = client
  }

  execute (image) {
    return this.client.updateProfilePicture(this.client.getToken(), image)
  }
}
