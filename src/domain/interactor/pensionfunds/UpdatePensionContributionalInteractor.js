export default class UpdatePensionContributionalInteractor {
  constructor (client) {
    this.client = client
  }

  execute (amount, code, id) {
    return this.client.updatePensionContributional(this.client.getToken(), amount, code, id)
  }
}
