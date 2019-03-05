export default class PostStaffAccountsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (staffAccountsParam) {
    return this.client.addStaffAccounts(this.client.getToken(), staffAccountsParam)
  }
}
