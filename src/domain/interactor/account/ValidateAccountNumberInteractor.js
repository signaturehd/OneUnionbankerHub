export default class ValidateAccountNumberInteractor {
  constructor (client) {
    this.client = client
  }

  execute (accountNumber) {
    return this.client.validateAccountNumber(this.client.getToken(), accountNumber)
      .do(resp => {
        this.client.updateAccountNumber(this.client.getToken(), accountNumber)
        .do(resp => {
          this.client.setAccountNumber(accountNumber)
        })
      })
  }
}
