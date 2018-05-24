export default class LoginInteractor {
  constructor (client) {
    this.client = client
  }

  execute (loginParam) {
    return this.client.login(loginParam)
  }
}
