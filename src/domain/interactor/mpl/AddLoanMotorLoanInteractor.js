export default class AddLoanMotorLoanInteractor {
  constructor (client) {
    this.client = client
  }

  execute (addMotorLoanParam) {
    return this.client.addLoanMotor(
        this.client.getToken(),
        this.client.getAccountToken(),
        this.client.getAccountNumber(),
        this.client.getReleasingCenter(),
        addMotorLoanParam)
  }
}
