export default class AddLoanInteractor {
  constructor (client) {
    this.client = client
  }

  execute (multiPurposeLoanParam) {
    return this.client.AddLoanInteractor(
        this.client.getToken(),
        this.client.getAccountToken(),
        this.client.getAccountNumber(),
        this.client.getReleasingCenter(),
        multiPurposeLoanParam)
  }
}
