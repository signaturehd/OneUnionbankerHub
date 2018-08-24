export default class LeaveFilingInteractor {
  constructor (client) {
    this.client = client
  }

  execute (leaveFilingParam) {
    return this.client.addLeaveFiling(this.client.getToken(), leaveFilingParam)
  }
}
