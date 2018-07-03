export default class AddBereavementInteractor {
  constructor (client) {
    this.client = client
  }

  execute (AddBereavementParam) {
    return this.client.addBereavementInteractor(this.client.getToken(), AddBereavementParam)
  }
}
