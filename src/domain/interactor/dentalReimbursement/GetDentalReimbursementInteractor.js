export default class GetDentalReimbursementInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getDentalReimbursement(this.client.getToken())
  }
}
