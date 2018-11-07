export default class RequestNewPasswordInteractor {
  constructor (client) {
    this.client = client
  }

  execute (token, newPassword, confirmPassword, otp) {
    return this.client.requestNewPassword(token, newPassword, confirmPassword, otp)
  }
}
