export default class AddFeedbackInteractor {
  constructor (client) {
    this.client = client
  }

  execute (FeedbackParam) {
    return this.client.addFeedback(this.client.getToken(), FeedbackParam)
  }
}
