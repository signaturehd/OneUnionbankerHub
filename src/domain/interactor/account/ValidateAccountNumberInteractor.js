export default class ValidateAccountNumberInteractor {
  constructor (client) {
    this.client = client
  }

  execute (accountNumber) {
    return this.client.validateAccountNumber(this.client.getAccountToken(), accountNumber)
      .do(resp => {
        // when valid, set it to session
        this.client.setAccountNumber(accountNumber)
      })
  }
}
