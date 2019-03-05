export default class AddLaptopLeaseInteractor {
  constructor (client) {
    this.client = client
  }

  execute (addLaptopLeaseParam) {
    
    return this.client.addLaptopLease(
      this.client.getToken(),
      this.client.getAccountToken(),
      this.client.getAccountNumber(),
      this.client.getReleasingCenter(),
      addLaptopLeaseParam
    )
  }

}
