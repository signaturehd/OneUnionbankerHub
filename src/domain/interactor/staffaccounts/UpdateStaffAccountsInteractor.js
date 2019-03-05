export default class UpdateStaffAccountsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (staffAccountsParam) {
    return this.client.updateStaffAccounts(this.client.getToken(), staffAccountsParam)
  }
}
