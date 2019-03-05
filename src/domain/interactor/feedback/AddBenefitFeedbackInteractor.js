export default class AddFeedbackInteractor {
  constructor (client) {
    this.client = client
  }

  execute (AddBenefitFeedbackParam) {
    return this.client.addBenefitFeedback(this.client.getToken(), AddBenefitFeedbackParam)
  }
}
