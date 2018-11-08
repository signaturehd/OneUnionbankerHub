let birtDate = ''
let employeeId = ''

export default class RequestEmailVerificationInteractor {
  constructor (client) {
    this.client = client
  }

  execute (empId, date) {
    employeeId = empId
    birtDate = date
    return this.client.requestEmailVerification(this.client.getToken(), empId, date)
  }

  executeNewPassword (token, newPassword, otp) {
    return this.client.requestNewPassword(token, newPassword, otp, employeeId, birtDate)
  }
}
