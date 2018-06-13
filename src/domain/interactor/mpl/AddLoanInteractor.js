export default class AddLoanInteractor {
  constructor (client) {
    this.client = client
  }

  execute (mplPurposeLoanAddParam) {
    return this.client.addLoan(
        this.client.getToken(),
        this.client.getAccountToken(),
        this.client.getAccountNumber(),
        this.client.getReleasingCenter(),
        mplPurposeLoanAddParam)
  }
}
