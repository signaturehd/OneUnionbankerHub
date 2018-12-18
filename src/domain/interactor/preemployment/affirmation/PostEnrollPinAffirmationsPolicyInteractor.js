export default class PostEnrollPinAffirmationsPolicyInteractor {
  constructor (client) {
    this.client = client
  }

  execute (pin) {
    return this.client.postEnrollPinAffirmationsPolicy(this.client.getToken(), pin)
  }
}
