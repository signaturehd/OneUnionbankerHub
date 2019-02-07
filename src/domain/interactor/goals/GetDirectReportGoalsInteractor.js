export default class GetDirectReportGoalsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (status) {
    return this.client.getDirectReportGoals(this.client.getToken(), status)
  }
}
