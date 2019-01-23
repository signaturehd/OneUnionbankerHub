export default class AddGoalTaskInteractor {
  constructor (client) {
    this.client = client
  }

  execute (goalCommentParam) {
    return this.client.addGoalComment(this.client.getToken(), goalCommentParam)
  }
}
