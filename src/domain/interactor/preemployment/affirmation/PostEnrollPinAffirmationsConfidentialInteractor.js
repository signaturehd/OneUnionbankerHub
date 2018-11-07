export default class PostEnrollPinAffirmationsConfidentialInteractor {
  constructor (client) {
    this.client = client
  }

  execute (pin) {
    return this.client.postEnrollPinAffirmationsConfidential(this.client.getToken(), pin)
  }
}
