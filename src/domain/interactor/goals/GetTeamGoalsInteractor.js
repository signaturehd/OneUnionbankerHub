export default class GetTeamGoalsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (goalType) {
    return this.client.getTeamGoals(this.client.getToken(), goalType)
  }
}
