export default class RequestUnlockPinInteractor {
  constructor (client) {
    this.client = client
  }

  execute (empId, date) {
    return this.client.requestUnlockPin(this.client.getToken(), empId, date)
  }
}
