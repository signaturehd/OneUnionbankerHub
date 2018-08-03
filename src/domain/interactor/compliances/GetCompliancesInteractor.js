export default class GetCompliancesInteractor {
  constructor (client) {
    this.client = client
  }

  execute (file) {
    return this.client.getCompliancesPdf(this.client.getToken(), file)
  }
}
