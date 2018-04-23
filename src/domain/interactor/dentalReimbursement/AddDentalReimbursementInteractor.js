export default class AddDentalReimbursementInteractor {
  constructor (client) {
    this.client = client
  }

  execute (dentalReimbursementParam) {
    return this.client.addDentalReimbursement(this.client.getToken(), dentalReimbursementParam)
  }
}
