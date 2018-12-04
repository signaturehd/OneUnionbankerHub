export default class DeleteGoalsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (goalId) {
    return this.client.deleteGoal(this.client.getToken(), goalId)
  }
}
