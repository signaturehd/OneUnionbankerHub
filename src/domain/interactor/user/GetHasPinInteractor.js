export default class GetHasPinInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    const user = this.client.getProfile()
    return user && user.hasPIN
  }
}
