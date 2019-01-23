export default class AddSquadGoalsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (squadGoalsParam) {
    return this.client.addTeamGoals(this.client.getToken(), squadGoalsParam)
  }
}
