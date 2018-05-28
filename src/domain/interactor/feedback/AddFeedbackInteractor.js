export default class AddFeedbackInteractor {
  constructor (client) {
    this.client = client
  }

  execute (addFeedbackParam) {
    return this.client.addFeedback(this.client.getToken(), addFeedbackParam)
  }
}
