export default class GetInformationInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    const user = this.client.getProfile()
    return user && user.employee
  }
}
