export default class GetDirectReportGoalsInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getDirectReportGoals(this.client.getToken())
  }
}
