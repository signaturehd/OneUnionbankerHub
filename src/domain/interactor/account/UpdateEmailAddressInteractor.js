export default class UpdateEmailAddressInteractor {
  constructor (client) {
    this.client = client
  }

  execute (email) {
    return this.client.updateEmailAddress(this.client.getToken(), email)
  }
}
