export default class GetCompliancesInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getCompliances(this.client.getToken())
  }
}
