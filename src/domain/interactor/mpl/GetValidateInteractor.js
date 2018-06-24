export default class GetValidateInteractor {
  constructor (client) {
    this.client = client
  }

  execute (mplValidatedLoanParam) {
    return this.client.getMPLValidate(this.client.getToken(), mplValidatedLoanParam)
  }
}
