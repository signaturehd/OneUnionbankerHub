export default class GetTeamGoalsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (status, goalType) {
    return this.client.getTeamGoals(this.client.getToken(), status, goalType)
  }
}
