export default class ConfirmLaptopLeaseInteractor {
  constructor (client) {
    this.client = client
  }

  execute (transactionId, isConfirm) {
    return this.client.confirmLaptopLease(this.client.getToken(), transactionId, isConfirm)
  }
}
