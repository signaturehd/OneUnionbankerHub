export default class GetCompliancesInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getCompliancesPdf(this.client.getToken())
  }
}
