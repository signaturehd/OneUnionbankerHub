export default class ResendOtpInteractor {
  constructor (client) {
    this.client = client
  }

  execute (otpParam) {
    return this.client.resend(otpParam)
  }
}
