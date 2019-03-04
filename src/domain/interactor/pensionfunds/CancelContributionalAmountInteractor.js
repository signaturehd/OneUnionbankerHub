export default class CancelContributionalAmountInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.cancelContributionalAmount(this.client.getToken())
  }
}
