export default class RequestOtpVerificationInteractor {
  constructor (client) {
    this.client = client
  }

  execute (token, otp) {
    return this.client.requestOtpVerification(token, otp)
  }
}
