export default class RequestOtpVerificationInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.requestOtpVerification(this.client.getToken())
  }
}
