export default class RequestUnlockAccountInteractor {
  constructor (client) {
    this.client = client
  }

  execute (empId, date) {
    return this.client.requestUnlockAccount(this.client.getToken(), empId, date)
  }
}
