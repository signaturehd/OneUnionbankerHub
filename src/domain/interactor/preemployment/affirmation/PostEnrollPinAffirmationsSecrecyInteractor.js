export default class PostEnrollPinAffirmationsSecrecyInteractor {
  constructor (client) {
    this.client = client
  }

  execute (pin) {
    return this.client.postEnrollPinAffirmationsSecrecy(this.client.getToken(), pin)
  }
}
