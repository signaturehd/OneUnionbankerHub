export default class RequestNewPasswordInteractor {
  constructor (client) {
    this.client = client
  }

  execute (otp, date, empId, password) {
    return this.client.requestNewPassword(this.client.getToken(), otp, date, empId, password)
  }
}
