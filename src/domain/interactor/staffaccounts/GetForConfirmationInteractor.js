export default class GetForConfirmationInteractor {
  constructor (client) {
    this.client = client
  }

  execute (id) {
    return this.client.getForConfirmation(this.client.getToken(), id)
  }
}
