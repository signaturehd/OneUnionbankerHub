export default class GetBiographicalFormInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getBiographicalForm(this.client.getToken())
  }
}
