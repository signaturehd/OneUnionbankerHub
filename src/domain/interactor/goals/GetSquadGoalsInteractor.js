export default class GetSquadGoalsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (goalType) {
    return this.client.getSquadGoals(this.client.getToken(), goalType)
  }
}
