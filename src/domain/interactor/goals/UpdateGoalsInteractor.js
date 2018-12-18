export default class UpdateGoalsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (goalId, startDate, dueDate) {
    return this.client.updateGoals(this.client.getToken(), goalId, startDate, dueDate)
  }
}
