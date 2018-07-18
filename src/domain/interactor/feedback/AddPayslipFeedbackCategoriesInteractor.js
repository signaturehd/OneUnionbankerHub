export default class AddPayslipFeedbackCategoriesInteractor {
  constructor (client) {
    this.client = client
  }

  execute (addPayslipFeedbackParam) {
    return this.client.addPayslipFeedbackDiscrepancy(this.client.getToken(), addPayslipFeedbackParam)
  }
}
