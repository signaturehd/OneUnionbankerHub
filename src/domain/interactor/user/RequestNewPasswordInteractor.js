export default class RequestNewPasswordInteractor {
  constructor (client) {
    this.client = client
  }

  execute (token, newPassword, otp) {
    return this.client.requestNewPassword(token, newPassword, otp)
  }
}
