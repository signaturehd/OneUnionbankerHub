export default class LogoutInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.logout(this.client.getToken())
      .do(resp => this.client.setToken(''))
      .do(resp => this.client.setInitialToken(''))
      .do(resp => this.client.setProfile(''))
  }
}
