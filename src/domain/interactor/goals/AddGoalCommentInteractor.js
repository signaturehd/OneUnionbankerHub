export default class AddGoalTaskInteractor {
  constructor (client) {
    this.client = client
  }

  execute (goalId, goalComment) {
    return this.client.addGoalComment(this.client.getToken(), goalId, goalComment)
  }
}
