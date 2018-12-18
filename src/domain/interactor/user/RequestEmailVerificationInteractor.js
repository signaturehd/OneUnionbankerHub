export default class RequestEmailVerificationInteractor {
  constructor (client) {
    this.client = client
  }

  execute (empId, date) {
    return this.client.requestEmailVerification(this.client.getToken(), empId, date)
  }
}
