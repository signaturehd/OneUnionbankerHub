export default class GetRequestedGoalsInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getGoals(this.client.getToken())
  }
}
