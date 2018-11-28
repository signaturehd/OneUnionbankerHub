export default class GetGoalTaskInteractor {
  constructor (client) {
    this.client = client
  }

  execute (goalId) {
    return this.client.getGoalTask(this.client.getToken(), goalId)
  }
}
