export default class AddLoanInteractor {
  constructor (client) {
    this.client = client
  }

  execute (multiPurposeLoanAddParam) {
    return this.client.AddLoanInteractor(
        this.client.getToken(),
        this.client.getAccountToken(),
        this.client.getAccountNumber(),
        this.client.getReleasingCenter(),
        multiPurposeLoanAddParam)
  }
}
