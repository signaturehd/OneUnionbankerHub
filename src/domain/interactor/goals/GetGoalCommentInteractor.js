export default class GetGoalCommentInteractor {
  constructor (client) {
    this.client = client
  }

  execute (goalId, pageNumber, pageItem) {
    return this.client.getGoalComment(this.client.getToken(), goalId, pageNumber, pageItem)
  }
}
