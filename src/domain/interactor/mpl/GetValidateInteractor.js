export default class GetValidateInteractor {
  constructor (client) {
    this.client = client
  }

  execute (mplValidatedLoanParam) {
    return this.client.getMplValidate(this.client.getToken(), mplValidatedLoanParam)
  }
}
