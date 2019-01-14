export default class GetRequestedGoalsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (status) {
    return this.client.getGoals(this.client.getToken(), status)
  }
}
