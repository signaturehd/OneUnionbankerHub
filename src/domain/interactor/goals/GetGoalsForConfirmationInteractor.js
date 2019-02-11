export default class GetGoalsForConfirmationInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getGoalsForConfirmation(this.client.getToken())
  }
}
