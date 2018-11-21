export default class AddRequestedGoalsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (requestedGoalsParam) {
    return this.client.addRequestedGoals(this.client.getToken(), requestedGoalsParam)
  }
}
