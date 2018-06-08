export default class GetTermAndRatesInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getMPLValidate(this.client.getToken(), mplValidatedLoanParam)
  }
}
