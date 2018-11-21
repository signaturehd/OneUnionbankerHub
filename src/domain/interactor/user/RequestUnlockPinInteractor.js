export default class RequestUnlockPinInteractor {
  constructor (client) {
    this.client = client
  }

  execute (otp, newCode) {
    return this.client.requestUnlockPin(this.client.getToken(), otp, newCode)
  }
}
