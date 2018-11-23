export default class UpdateGoalsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (goalId, dueDate) {
    return this.client.updateGoals(this.client.getToken(), goalId, dueDate)
  }
}
