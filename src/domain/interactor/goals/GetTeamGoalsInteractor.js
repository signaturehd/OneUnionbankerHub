export default class GetTeamGoalsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (status) {
    return this.client.getTeamGoals(this.client.getToken(), status)
  }
}
