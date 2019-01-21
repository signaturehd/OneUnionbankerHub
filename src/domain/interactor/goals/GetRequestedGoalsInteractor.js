export default class GetRequestedGoalsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (goalType) {
    return this.client.getGoals(this.client.getToken(), goalType)
  }
}
