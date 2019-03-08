export default class GetPensionAgreementValidateInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    const user = this.client.getProfile()
    return user && user.pensionAgreement
  }
}
