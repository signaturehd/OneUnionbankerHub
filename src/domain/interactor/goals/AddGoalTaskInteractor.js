export default class AddGoalTaskInteractor {
  constructor (client) {
    this.client = client
  }

  execute (goalId, taskDescription) {
    return this.client.addGoalTask(this.client.getToken(), goalId, taskDescription)
  }
}
