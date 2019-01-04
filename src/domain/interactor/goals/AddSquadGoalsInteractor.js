export default class AddSquadGoalsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (squadParam) {
    return this.client.addSquadGoals(this.client.getToken(), squadParam)
  }
}
