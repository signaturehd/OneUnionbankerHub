export default class ValidateManagersCheckInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getProfile()
  }
}
