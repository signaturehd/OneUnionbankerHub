export default class DeleteCommentInteractor {
  constructor (client) {
    this.client = client
  }

  execute (commentId) {
    return this.client.deleteComment(this.client.getToken(), commentId)
  }
}
