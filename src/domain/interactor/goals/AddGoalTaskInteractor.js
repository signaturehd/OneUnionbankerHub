export default class AddGoalTaskInteractor {
  constructor (client) {
    this.client = client
  }

  execute (goalTaskParam) {
    return this.client.addGoalTask(this.client.getToken(), goalTaskParam)
  }
}
