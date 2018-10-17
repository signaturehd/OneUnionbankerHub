export default class ValidateLaptopLeaseInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.validateLaptopLease(this.client.getToken())
  }
}
