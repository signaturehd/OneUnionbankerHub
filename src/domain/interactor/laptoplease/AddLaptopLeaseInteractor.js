export default class AddLaptopLeaseInteractor {
  constructor (client) {
    this.client = client
  }

  execute (amount, terms, color, deliveryOption, file) {
    return this.client.addLaptopLease(
      this.client.getToken(),
      this.client.getToken(),
      this.client.getAccountToken(),
      this.client.getAccountNumber(),
      this.client.getReleasingCenter(),
      amount,
      terms,
      color,
      deliveryOption,
      file,
    )
  }

}
