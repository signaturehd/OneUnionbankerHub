export default class AddComputerLoanInteractor {
  constructor (client) {
    this.client = client
  }

  execute (addComputerLoanParam) {
    return this.client.addLoanComputer(
        this.client.getToken(),
        this.client.getAccountToken(),
        this.client.getAccountNumber(),
        this.client.getReleasingCenter(),
        addComputerLoanParam)
  }
}
