export default class AddPensionContributionalInteractor {
  constructor (client) {
    this.client = client
  }

  execute (amount, code) {
    return this.client.addPensionContributional(this.client.getToken(), amount, code)
  }
}
