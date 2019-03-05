export default class AddDentalReimbursementInteractor {
  constructor (client) {
    this.client = client
  }

  execute (dentalReimbursementParam) {
    return this.client.addDentalReimbursement(
        this.client.getToken(),
        this.client.getAccountToken(),
        this.client.getAccountNumber(),
        this.client.getReleasingCenter(),
        dentalReimbursementParam)
  }
}
