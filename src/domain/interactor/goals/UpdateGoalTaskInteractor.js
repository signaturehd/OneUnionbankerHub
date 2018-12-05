export default class UpdateGoalTaskInteractor {
  constructor (client) {
    this.client = client
  }

  execute (goalId, taskDescription, isCompleted) {
    return this.client.updateGoalTask(this.client.getToken(), goalId, taskDescription, isCompleted)
  }
}
