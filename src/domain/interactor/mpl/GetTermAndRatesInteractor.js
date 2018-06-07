export default class GetTermAndRatesInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getMPLTermAndRates(this.client.getToken())
  }
}
