export default class GetPurposeOfAvailmentInteractor {
  constructor (client) {
    this.client = client
  }

  execute (multiPurposeLoanParam) {
    return this.client.getMPLPurposeAvailment(this.client.getToken(), multiPurposeLoanParam)
  }
}
