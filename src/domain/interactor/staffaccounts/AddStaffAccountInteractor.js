export default class AddStaffAccountInteractor {
  constructor (client) {
    this.client = client
  }

  execute (addParam) {
    return this.client.getForConfirmation(this.client.getToken(), addParam)
  }
}
