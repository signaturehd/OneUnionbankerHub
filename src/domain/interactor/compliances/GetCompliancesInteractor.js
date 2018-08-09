export default class GetCompliancesInteractor {
  constructor (client) {
    this.client = client
  }

  execute (page) {
    return this.client.getCompliancesPdf(this.client.getToken(), page)
  }
}
