export default class UpdateGoalCommentInteractor {
  constructor (client) {
    this.client = client
  }

  execute (commentId, goalComment) {
    return this.client.updateGoalComment(this.client.getToken(), commentId, goalComment)
  }
}
