export default class PostStaffAccountsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (addStaffAccounts) {
    return this.client.addStaffAccounts(
      this.client.getToken(),
      this.client.getAccountNumber(),
      addStaffAccounts)
  }
}
