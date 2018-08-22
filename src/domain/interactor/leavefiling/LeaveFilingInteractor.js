export default class LeaveFilingInteractor {
  constructor (client) {
    this.client = client
  }

  execute (addLeaveFilingParam) {
    return this.client.addLeaveFilling(this.client.getToken(), addLeaveFilingParam)
  }
}
