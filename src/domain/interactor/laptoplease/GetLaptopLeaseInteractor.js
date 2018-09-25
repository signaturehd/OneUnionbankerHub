export default class GetLaptopLeaseInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getLaptopLease(this.client.getToken())
  }
}
