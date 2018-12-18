export default class GetRequestOtpUnlockInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getRequestPinOtp(this.client.getToken())
  }
}
