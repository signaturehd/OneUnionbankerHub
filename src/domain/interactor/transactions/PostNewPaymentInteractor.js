export default class PostNewPaymentInteractor {
  constructor (client) {
    this.client = client
  }

  execute (addCarLeasePayment) {
    return this.client.addCarLeasePayment(
      this.client.getToken(),
      addCarLeasePayment)
  }
}
