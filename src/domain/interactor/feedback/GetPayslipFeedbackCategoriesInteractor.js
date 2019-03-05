export default class GetPayslipFeedbackCategoriesInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getPayslipFeedbackCategoriesDiscrepancy(this.client.getToken())
  }
}
