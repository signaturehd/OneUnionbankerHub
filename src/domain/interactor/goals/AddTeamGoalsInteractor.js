export default class AddTeamGoalsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (teamGoalsParam) {
    return this.client.addTeamGoals(this.client.getToken(), teamGoalsParam)
  }
}
