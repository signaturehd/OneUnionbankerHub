export default class GetSquadGoalsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (status) {
    return this.client.getSquadGoals(this.client.getToken(), status)
  }
}
