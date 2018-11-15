export default class RequestOtpVerificationInteractor {
  constructor (client) {
    this.client = client
  }

  execute (token) {
    return this.client.requestOtpVerification(token)
  }
}
