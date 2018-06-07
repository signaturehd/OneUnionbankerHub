export default class GetPurposeOfAvailmentInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getMPLPurposeAvailment(this.client.getToken())
  }
}
