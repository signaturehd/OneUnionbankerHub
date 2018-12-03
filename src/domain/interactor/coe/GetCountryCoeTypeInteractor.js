export default class GetCountryCoeTypeInteractor {
  constructor (client) {
    this.client = client
  }

  execute (data) {
    return this.client.getCountryCoeType(this.client.getToken(), data)
  }
}
