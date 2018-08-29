export default class PostNewPaymentInteractor {
  constructor (client) {
    this.client = client
  }

  execute (addCarLeasePayment) {
    return this.client.addCarLeaseConfirmation(
      this.client.getToken(),
      addCarLeasePayment)
  }
}
