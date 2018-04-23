export default class LogoutInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    // TODO call logout API
    return this.client.setToken('')
  }
}
