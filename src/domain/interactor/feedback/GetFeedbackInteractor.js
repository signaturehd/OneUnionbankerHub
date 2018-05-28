export default class GetFeedbackInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getFeedback(this.client.getToken())
  }
}
