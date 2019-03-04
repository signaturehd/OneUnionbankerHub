export default class CancelContributionalAmountInteractor {
  constructor (client) {
    this.client = client
  }

  execute (code) {
    return this.client.cancelContributionalAmount(this.client.getToken(), code)
  }
}
