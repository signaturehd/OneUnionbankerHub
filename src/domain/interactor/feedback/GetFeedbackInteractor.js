export default class GetFeedbackInteractor {
  constructor (client) {
    this.client = client
  }

  execute (FeedbackParam) {
    return this.client.getFeedback(this.client.getToken(), FeedbackParam)
  }
}
